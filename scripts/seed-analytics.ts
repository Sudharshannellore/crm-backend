/**
 * Adds a larger volume of Leads, Deals, Tasks, Meetings, and Campaigns with
 * createdAt/dueDate/closeDate/startDate timestamps spread randomly across the
 * last 30 days, so the analytics/dashboard charts (which are otherwise flat
 * because everything from `seed.ts` shares the same insert timestamp) show a
 * realistic day-to-day trend.
 *
 * Additive — safe to run after (or instead of) `npm run seed`. Run with:
 *   npm run seed:analytics
 */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import { Lead, LeadSchema, LeadSource, LeadStatus } from '../src/leads/schemas/lead.schema';
import { Deal, DealSchema, DealStage, DealPriority } from '../src/deals/schemas/deal.schema';
import {
  Task,
  TaskSchema,
  TaskPriority,
  TaskCategory,
  TaskStatus,
} from '../src/tasks/schemas/task.schema';
import { Meeting, MeetingSchema, MeetingType } from '../src/meetings/schemas/meeting.schema';
import {
  Campaign,
  CampaignSchema,
  CampaignType,
  CampaignStatus,
} from '../src/campaigns/schemas/campaign.schema';

const COMPANIES = [
  'Acme Corp', 'Globex Industries', 'Initech Solutions', 'Umbrella Holdings',
  'Stark Enterprises', 'Wayne Technologies', 'Wonka Foods', 'Hooli Inc',
  'Pied Piper', 'Aperture Science', 'Cyberdyne Systems', 'Soylent Corp',
  'Massive Dynamic', 'Gringotts Bank', 'Oscorp Industries', 'Tyrell Corp',
];

const PEOPLE = [
  'Alex Turner', 'Priya Sharma', 'Tom Anderson', 'Nina Volkov', 'Carlos Diaz',
  'Grace Lee', 'Ben Foster', 'Maya Singh', 'Ethan Brooks', 'Zoe Campbell',
  'Sarah Thompson', 'Michael Chen', 'Emily Rodriguez', 'David Park', 'Lisa Wang',
];

/** Random moment between `daysAgo` days ago and now (inclusive), with a random time of day. */
function randomTimestampWithinLastDays(daysAgo: number): Date {
  const now = Date.now();
  const earliest = now - daysAgo * 24 * 60 * 60 * 1000;
  return new Date(earliest + Math.random() * (now - earliest));
}

function randomTimestampWithinNextDays(days: number): Date {
  const now = Date.now();
  return new Date(now + Math.random() * days * 24 * 60 * 60 * 1000);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set (check .env)');
  }
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const LeadModel = mongoose.model(Lead.name, LeadSchema);
  const DealModel = mongoose.model(Deal.name, DealSchema);
  const TaskModel = mongoose.model(Task.name, TaskSchema);
  const MeetingModel = mongoose.model(Meeting.name, MeetingSchema);
  const CampaignModel = mongoose.model(Campaign.name, CampaignSchema);

  // --- Leads (60), spread across the last 30 days ------------------------
  const leadSources = Object.values(LeadSource);
  const leadStatuses = Object.values(LeadStatus);
  const LEAD_COUNT = 60;
  const leadDocs = Array.from({ length: LEAD_COUNT }, (_, i) => {
    const created = randomTimestampWithinLastDays(30);
    const person = pick(PEOPLE);
    const status = pick(leadStatuses);
    return {
      name: `${person} ${i}`,
      company: `${pick(COMPANIES)} ${i % 2 === 0 ? 'Ventures' : 'Group'}`,
      email: `lead${i}.${person.toLowerCase().replace(/\s+/g, '.')}@leadmail.com`,
      phone: `+1-555-${String(300 + i).padStart(3, '0')}-${String(6000 + i)}`,
      value: randomInt(10, 200) * 1000,
      source: pick(leadSources),
      status,
      territory: pick(['West', 'East', 'Central', 'South', 'North']),
      notes: `Inbound via ${pick(leadSources)}, day-${randomInt(0, 30)} follow-up.`,
      score: randomInt(10, 95),
      lastContact: created,
      createdAt: created,
      updatedAt: created,
      ...(status === LeadStatus.QUALIFIED ? { convertedAt: created } : {}),
    };
  });
  const leads = await LeadModel.insertMany(leadDocs, { timestamps: false });
  console.log(`Seeded ${leads.length} additional leads spread across the last 30 days`);

  // --- Deals (50), createdAt spread over the last 30 days, close dates a --
  // --- mix of past (won/lost) and near-future (open) ---------------------
  const dealPriorities = Object.values(DealPriority);
  const OPEN_STAGES = [DealStage.DISCOVERY, DealStage.QUALIFICATION, DealStage.PROPOSAL, DealStage.NEGOTIATION];
  const DEAL_COUNT = 50;
  const dealDocs = Array.from({ length: DEAL_COUNT }, (_, i) => {
    const created = randomTimestampWithinLastDays(30);
    const outcome = Math.random();
    // Weighted: ~55% still open, ~30% won, ~15% lost — gives a healthy-looking pipeline.
    const stage =
      outcome < 0.55 ? pick(OPEN_STAGES) : outcome < 0.85 ? DealStage.CLOSED_WON : DealStage.CLOSED_LOST;
    const closeDate =
      stage === DealStage.CLOSED_WON || stage === DealStage.CLOSED_LOST
        ? randomTimestampWithinLastDays(30)
        : randomTimestampWithinNextDays(45);
    const company = pick(COMPANIES);
    return {
      title: `${company} - ${pick(['Cloud Migration', 'Enterprise License', 'Support Contract', 'Expansion Deal', 'Renewal', 'Platform Upgrade'])}`,
      company,
      value: randomInt(20, 500) * 1000,
      closeDate,
      owner: pick(PEOPLE),
      stage,
      priority: pick(dealPriorities),
      probability:
        stage === DealStage.CLOSED_WON ? 100 : stage === DealStage.CLOSED_LOST ? 0 : randomInt(10, 90),
      description: `Deal in progress with ${company} for ${pick(['cloud infrastructure', 'security suite', 'analytics platform', 'support renewal'])}.`,
      createdAt: created,
      updatedAt: created,
    };
  });
  const deals = await DealModel.insertMany(dealDocs, { timestamps: false });
  console.log(`Seeded ${deals.length} additional deals spread across the last 30 days`);

  // --- Tasks (40), createdAt spread over the last 30 days, due dates a mix
  // --- of overdue / due today / upcoming ----------------------------------
  const taskPriorities = Object.values(TaskPriority);
  const taskCategories = Object.values(TaskCategory);
  const TASK_COUNT = 40;
  const taskTitles = [
    'Follow up on pricing proposal', 'Send product documentation', 'Schedule technical demo',
    'Prepare contract draft', 'Review onboarding checklist', 'Call to confirm renewal',
    'Send meeting recap', 'Update CRM notes', 'Coordinate with legal team', 'Draft QBR deck',
    'Chase overdue invoice', 'Set up trial environment', 'Log support ticket follow-up',
  ];
  const taskDocs = Array.from({ length: TASK_COUNT }, (_, i) => {
    const created = randomTimestampWithinLastDays(30);
    const dueOutcome = Math.random();
    const dueDate = dueOutcome < 0.3 ? randomTimestampWithinLastDays(10) : randomTimestampWithinNextDays(14);
    const status = dueOutcome < 0.3 && Math.random() < 0.5 ? TaskStatus.PENDING : pick(Object.values(TaskStatus));
    return {
      title: `${pick(taskTitles)} #${i}`,
      dueDate,
      dueTime: `${String(randomInt(8, 17)).padStart(2, '0')}:00`,
      assignee: pick(PEOPLE),
      priority: pick(taskPriorities),
      category: pick(taskCategories),
      relatedTo: pick(deals).title,
      description: `Task related to ${pick(COMPANIES)}.`,
      status,
      createdAt: created,
      updatedAt: created,
    };
  });
  await TaskModel.insertMany(taskDocs, { timestamps: false });
  console.log(`Seeded ${taskDocs.length} additional tasks spread across the last 30 days`);

  // --- Meetings (20), createdAt spread over the last 30 days --------------
  const meetingTypes = Object.values(MeetingType);
  const MEETING_COUNT = 20;
  const meetingTitles = [
    'Discovery Call', 'Product Demo', 'Contract Negotiation', 'Kickoff Meeting', 'QBR Review',
    'Technical Deep Dive', 'Renewal Discussion', 'Onboarding Session', 'Executive Briefing', 'Support Sync',
  ];
  const meetingDocs = Array.from({ length: MEETING_COUNT }, (_, i) => {
    const created = randomTimestampWithinLastDays(30);
    const type = pick(meetingTypes);
    const meetingDate = Math.random() < 0.4 ? randomTimestampWithinLastDays(20) : randomTimestampWithinNextDays(14);
    return {
      title: `${pick(meetingTitles)} #${i}`,
      type,
      date: meetingDate,
      time: `${String(randomInt(9, 17)).padStart(2, '0')}:30`,
      duration: pick([30, 45, 60]),
      location:
        type === MeetingType.IN_PERSON
          ? '100 Market Street, Suite 500'
          : type === MeetingType.PHONE
            ? `+1-555-900-${String(1000 + i)}`
            : `https://meet.example.com/room-${i}`,
      agenda: `Discuss ${pick(['pricing', 'roadmap', 'integration', 'renewal terms', 'support plan'])} with ${pick(COMPANIES)}.`,
      reminders: pick([10, 15, 30]),
      createdAt: created,
      updatedAt: created,
    };
  });
  await MeetingModel.insertMany(meetingDocs, { timestamps: false });
  console.log(`Seeded ${meetingDocs.length} additional meetings spread across the last 30 days`);

  // --- Campaigns (15), createdAt + startDate spread over the last 30 days --
  const campaignTypes = Object.values(CampaignType);
  const campaignStatuses = Object.values(CampaignStatus);
  const CAMPAIGN_COUNT = 15;
  const campaignNames = [
    'Q1 Product Launch', 'Summer Webinar Series', 'LinkedIn Ads Push', 'Customer Referral Program',
    'Trade Show Follow-up', 'Re-engagement Email Blast', 'New Feature Announcement', 'Holiday Promo',
    'Partner Co-Marketing', 'End of Year Renewal Push', 'Industry Report Launch', 'Case Study Push',
  ];
  const campaignDocs = Array.from({ length: CAMPAIGN_COUNT }, (_, i) => {
    const created = randomTimestampWithinLastDays(30);
    const startDate = created;
    const endDate = randomTimestampWithinNextDays(30);
    return {
      name: `${pick(campaignNames)} ${i}`,
      type: pick(campaignTypes),
      status: pick(campaignStatuses),
      startDate,
      endDate,
      budget: randomInt(3, 30) * 1000,
      targetAudience: pick(['Enterprise', 'SMB', 'Mid-Market', 'Existing Customers', 'Prospects']),
      goal: `Drive ${pick(['awareness', 'engagement', 'signups', 'renewals', 'referrals'])} for the ${pick(['technology', 'finance', 'healthcare'])} segment.`,
      description: `Marketing campaign targeting growth in ${pick(['North America', 'EMEA', 'APAC'])}.`,
      createdAt: created,
      updatedAt: created,
    };
  });
  await CampaignModel.insertMany(campaignDocs, { timestamps: false });
  console.log(`Seeded ${campaignDocs.length} additional campaigns spread across the last 30 days`);

  console.log('\nAnalytics seeding complete.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Analytics seed failed:', err);
  process.exit(1);
});
