import { Logger } from '@nestjs/common';
import type { Connection } from 'mongoose';

/**
 * Render's free tier sleeps a web service after ~15 min without inbound traffic.
 * Pinging our own PUBLIC url every 5 min keeps it awake. Render sets RENDER_EXTERNAL_URL
 * automatically; KEEP_ALIVE_URL overrides it (e.g. custom domain). Neither set = disabled (local dev).
 * Each tick also reads from MongoDB: Atlas pauses idle free (M0) clusters after 60 days without activity.
 */
export function startKeepAlive(
  connection: Connection,
): NodeJS.Timeout | undefined {
  const base = process.env.KEEP_ALIVE_URL || process.env.RENDER_EXTERNAL_URL;
  if (!base) return undefined;

  const logger = new Logger('KeepAlive');
  const url = base.replace(/\/$/, '') + '/'; // GET / is the health route
  const intervalMs =
    Number(process.env.KEEP_ALIVE_INTERVAL_SECONDS || 300) * 1000;

  const touchDb = async () => {
    const db = connection.db;
    if (!db) return;
    await db.admin().ping();
    const [first] = await db.listCollections().toArray();
    if (first) await db.collection(first.name).findOne({}, { projection: { _id: 1 } });
  };

  const timer = setInterval(() => {
    fetch(url, { signal: AbortSignal.timeout(20000) })
      .then((res) => logger.log(`ping ${url} -> ${res.status}`))
      .catch((err: Error) => logger.warn(`ping failed: ${err.message}`));
    touchDb().catch((err: Error) =>
      logger.warn(`db read failed: ${err.message}`),
    );
  }, intervalMs);
  timer.unref(); // never block shutdown

  logger.log(`pinging ${url} every ${intervalMs / 1000}s`);
  return timer;
}
