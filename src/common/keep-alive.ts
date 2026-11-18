import { Logger } from '@nestjs/common';

/**
 * Render's free tier sleeps a web service after ~15 min without inbound traffic.
 * Pinging our own PUBLIC url every 5 min keeps it awake. Render sets RENDER_EXTERNAL_URL
 * automatically; KEEP_ALIVE_URL overrides it (e.g. custom domain). Neither set = disabled (local dev).
 */
export function startKeepAlive(): NodeJS.Timeout | undefined {
  const base = process.env.KEEP_ALIVE_URL || process.env.RENDER_EXTERNAL_URL;
  if (!base) return undefined;

  const logger = new Logger('KeepAlive');
  const url = base.replace(/\/$/, '') + '/'; // GET / is the health route
  const intervalMs =
    Number(process.env.KEEP_ALIVE_INTERVAL_SECONDS || 300) * 1000;

  const timer = setInterval(() => {
    fetch(url, { signal: AbortSignal.timeout(20000) })
      .then((res) => logger.log(`ping ${url} -> ${res.status}`))
      .catch((err: Error) => logger.warn(`ping failed: ${err.message}`));
  }, intervalMs);
  timer.unref(); // never block shutdown

  logger.log(`pinging ${url} every ${intervalMs / 1000}s`);
  return timer;
}
