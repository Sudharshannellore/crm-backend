/**
 * One-off seed script: inserts at least 10 realistic records into every
 * collection. Run with: npm run seed
 *
 * Reuses the real Mongoose schema classes (same validation/enums the app
 * uses) rather than redefining shapes, so seeded data always matches what
 * the API actually returns.
 */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import { Lead, LeadSchema, LeadSource, LeadStatus } from '../src/leads/schemas/lead.schema';
import {
  Organization,
  OrganizationSchema,
  Industry,
  OrganizationType,
} from '../src/organizations/schemas/organization.schema';
import { Contact, ContactSchema, ContactType } from '../src/contacts/schemas/contact.schema';
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
import {
  Notification,
  NotificationSchema,
  NotificationType,
} from '../src/notifications/schemas/notification.schema';
import { Thread, ThreadSchema } from '../src/collaboration/schemas/thread.schema';
import { SharedNote, SharedNoteSchema } from '../src/collaboration/schemas/shared-note.schema';
import { Template, TemplateSchema, TemplateCategory } from '../src/templates/schemas/template.schema';
import {
  Integration,
  IntegrationSchema,
  IntegrationCategory,
  IntegrationStatus,
} from '../src/integrations/schemas/integration.schema';
import {
  EmailMessage,
  EmailMessageSchema,
  EmailMailbox,
} from '../src/email/schemas/email-message.schema';
import {
  Workflow,
  WorkflowSchema,
  WorkflowStatus,
} from '../src/workflows/schemas/workflow.schema';
import {
  WorkflowRun,
  WorkflowRunSchema,
  WorkflowRunStatus,
} from '../src/workflows/schemas/workflow-run.schema';

function daysFromNow(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set (check .env)');
  }
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const LeadModel = mongoose.model(Lead.name, LeadSchema);
  const OrganizationModel = mongoose.model(Organization.name, OrganizationSchema);
  const ContactModel = mongoose.model(Contact.name, ContactSchema);
  const DealModel = mongoose.model(Deal.name, DealSchema);
  const TaskModel = mongoose.model(Task.name, TaskSchema);
  const MeetingModel = mongoose.model(Meeting.name, MeetingSchema);
  const CampaignModel = mongoose.model(Campaign.name, CampaignSchema);
  const NotificationModel = mongoose.model(Notification.name, NotificationSchema);
  const ThreadModel = mongoose.model(Thread.name, ThreadSchema);
  const SharedNoteModel = mongoose.model(SharedNote.name, SharedNoteSchema);
  const TemplateModel = mongoose.model(Template.name, TemplateSchema);
  const IntegrationModel = mongoose.model(Integration.name, IntegrationSchema);
  const EmailMessageModel = mongoose.model(EmailMessage.name, EmailMessageSchema);
  const WorkflowModel = mongoose.model(Workflow.name, WorkflowSchema);
  const WorkflowRunModel = mongoose.model(WorkflowRun.name, WorkflowRunSchema);

  // --- Organizations (10) ---------------------------------------------
  const orgNames = [
    'Acme Corp', 'Globex Industries', 'Initech Solutions', 'Umbrella Holdings',
    'Stark Enterprises', 'Wayne Technologies', 'Wonka Foods', 'Hooli Inc',
    'Pied Piper', 'Aperture Science',
  ];
  const industries = Object.values(Industry);
  const orgTypes = Object.values(OrganizationType);
  const organizations = await OrganizationModel.insertMany(
    orgNames.map((name, i) => ({
      name,
      website: `https://${name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      industry: industries[i % industries.length],
      type: orgTypes[i % orgTypes.length],
      employeeCount: 50 + i * 120,
      annualRevenue: 500000 + i * 750000,
      billingAddress: `${100 + i} Market Street, San Francisco, CA`,
      phone: `+1-415-555-01${String(i).padStart(2, '0')}`,
      description: `${name} is a leading player in its industry, focused on growth and innovation.`,
    })),
  );
  console.log(`Seeded ${organizations.length} organizations`);

  // --- Contacts (10) ----------------------------------------------------
  const contactNames = [
    'Sarah Thompson', 'Michael Chen', 'Emily Rodriguez', 'David Park', 'Lisa Wang',
    'James Wilson', 'Olivia Martinez', 'Daniel Kim', 'Sophia Patel', 'Ryan Murphy',
  ];
  const contactTypes = Object.values(ContactType);
  const contacts = await ContactModel.insertMany(
    contactNames.map((name, i) => ({
      name,
      title: ['CEO', 'CTO', 'VP Sales', 'Product Manager', 'Director'][i % 5],
      company: organizations[i % organizations.length].name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: `+1-555-${String(100 + i).padStart(3, '0')}-${String(4000 + i)}`,
      type: contactTypes[i % contactTypes.length],
      linkedin: `https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '')}`,
      location: ['San Francisco, CA', 'Austin, TX', 'Chicago, IL', 'Boston, MA', 'Seattle, WA'][i % 5],
      bio: `${name} has over ${5 + i} years of experience driving growth in enterprise accounts.`,
      organizationId: String(organizations[i % organizations.length]._id),
    })),
  );
  console.log(`Seeded ${contacts.length} contacts`);

  // --- Leads (10) --------------------------------------------------------
  const leadSources = Object.values(LeadSource);
  const leadStatuses = Object.values(LeadStatus);
  const leadNames = [
    'Alex Turner', 'Priya Sharma', 'Tom Anderson', 'Nina Volkov', 'Carlos Diaz',
    'Grace Lee', 'Ben Foster', 'Maya Singh', 'Ethan Brooks', 'Zoe Campbell',
  ];
  const leads = await LeadModel.insertMany(
    leadNames.map((name, i) => {
      const status = leadStatuses[i % leadStatuses.length];
      const qualified = status === LeadStatus.QUALIFIED;
      return {
        name,
        company: `${name.split(' ')[1]} Ventures`,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@leadmail.com`,
        phone: `+1-555-${String(200 + i).padStart(3, '0')}-${String(5000 + i)}`,
        value: 20000 + i * 15000,
        source: leadSources[i % leadSources.length],
        status,
        territory: ['West', 'East', 'Central', 'South', 'North'][i % 5],
        notes: `Initial outreach via ${leadSources[i % leadSources.length]}, follow up needed.`,
        score: 30 + i * 7,
        lastContact: daysFromNow(-i),
        ...(qualified
          ? {
              organizationId: String(organizations[i % organizations.length]._id),
              contactId: String(contacts[i % contacts.length]._id),
              convertedAt: daysFromNow(-i - 1),
            }
          : {}),
      };
    }),
  );
  console.log(`Seeded ${leads.length} leads`);

  // --- Deals (10) --------------------------------------------------------
  const dealStages = Object.values(DealStage);
  const dealPriorities = Object.values(DealPriority);
  const deals = await DealModel.insertMany(
    orgNames.map((name, i) => ({
      title: `${name} - ${['Cloud Migration', 'Enterprise License', 'Support Contract', 'Expansion Deal', 'Renewal'][i % 5]}`,
      company: name,
      value: 50000 + i * 45000,
      closeDate: daysFromNow(15 + i * 5),
      owner: contactNames[i % contactNames.length],
      stage: dealStages[i % dealStages.length],
      priority: dealPriorities[i % dealPriorities.length],
      probability: [20, 40, 60, 75, 90, 10][i % 6],
      description: `Deal in progress with ${name} for ${['cloud infrastructure', 'security suite', 'analytics platform'][i % 3]}.`,
    })),
  );
  console.log(`Seeded ${deals.length} deals`);

  // --- Tasks (10) ----------------------------------------------------------
  const taskPriorities = Object.values(TaskPriority);
  const taskCategories = Object.values(TaskCategory);
  const taskStatuses = Object.values(TaskStatus);
  const tasks = await TaskModel.insertMany(
    Array.from({ length: 10 }, (_, i) => ({
      title: [
        'Follow up on pricing proposal', 'Send product documentation', 'Schedule technical demo',
        'Prepare contract draft', 'Review onboarding checklist', 'Call to confirm renewal',
        'Send meeting recap', 'Update CRM notes', 'Coordinate with legal team', 'Draft QBR deck',
      ][i],
      dueDate: daysFromNow(i - 2),
      dueTime: `${String(9 + (i % 8)).padStart(2, '0')}:00`,
      assignee: contactNames[i % contactNames.length],
      priority: taskPriorities[i % taskPriorities.length],
      category: taskCategories[i % taskCategories.length],
      relatedTo: deals[i % deals.length].title,
      description: `Task related to ${deals[i % deals.length].company}.`,
      status: taskStatuses[i % taskStatuses.length],
    })),
  );
  console.log(`Seeded ${tasks.length} tasks`);

  // --- Meetings (10) ---------------------------------------------------
  const meetingTypes = Object.values(MeetingType);
  const meetings = await MeetingModel.insertMany(
    Array.from({ length: 10 }, (_, i) => ({
      title: [
        'Discovery Call', 'Product Demo', 'Contract Negotiation', 'Kickoff Meeting', 'QBR Review',
        'Technical Deep Dive', 'Renewal Discussion', 'Onboarding Session', 'Executive Briefing', 'Support Sync',
      ][i],
      type: meetingTypes[i % meetingTypes.length],
      date: daysFromNow(i + 1),
      time: `${String(9 + (i % 8)).padStart(2, '0')}:30`,
      duration: [30, 45, 60][i % 3],
      location: meetingTypes[i % meetingTypes.length] === MeetingType.IN_PERSON
        ? '100 Market Street, Suite 500'
        : meetingTypes[i % meetingTypes.length] === MeetingType.PHONE
          ? `+1-555-900-${String(1000 + i)}`
          : `https://meet.example.com/room-${i}`,
      agenda: `Discuss ${['pricing', 'roadmap', 'integration', 'renewal terms', 'support plan'][i % 5]} with ${organizations[i % organizations.length].name}.`,
      reminders: [10, 15, 30][i % 3],
    })),
  );
  console.log(`Seeded ${meetings.length} meetings`);

  // --- Campaigns (10) ----------------------------------------------------
  const campaignTypes = Object.values(CampaignType);
  const campaignStatuses = Object.values(CampaignStatus);
  const campaigns = await CampaignModel.insertMany(
    Array.from({ length: 10 }, (_, i) => ({
      name: [
        'Q1 Product Launch', 'Summer Webinar Series', 'LinkedIn Ads Push', 'Customer Referral Program',
        'Trade Show Follow-up', 'Re-engagement Email Blast', 'New Feature Announcement', 'Holiday Promo',
        'Partner Co-Marketing', 'End of Year Renewal Push',
      ][i],
      type: campaignTypes[i % campaignTypes.length],
      status: campaignStatuses[i % campaignStatuses.length],
      startDate: daysFromNow(-10 + i * 3),
      endDate: daysFromNow(20 + i * 3),
      budget: 5000 + i * 3500,
      targetAudience: ['Enterprise', 'SMB', 'Mid-Market', 'Existing Customers', 'Prospects'][i % 5],
      goal: `Drive ${['awareness', 'engagement', 'signups', 'renewals', 'referrals'][i % 5]} for the ${['technology', 'finance', 'healthcare'][i % 3]} segment.`,
      description: `Marketing campaign targeting growth in ${['North America', 'EMEA', 'APAC'][i % 3]}.`,
    })),
  );
  console.log(`Seeded ${campaigns.length} campaigns`);

  // --- Notifications (10) ------------------------------------------------
  const notificationTypes = Object.values(NotificationType);
  const notifications = await NotificationModel.insertMany(
    Array.from({ length: 10 }, (_, i) => ({
      title: [
        'New lead assigned', 'Deal moved to negotiation', 'AI insight ready', 'Email opened by prospect',
        'Meeting starting soon', 'Contract expiring soon', 'Task overdue', 'Deal closed won',
        'New team member invited', 'System maintenance scheduled',
      ][i],
      message: `Notification details for event #${i + 1}.`,
      type: notificationTypes[i % notificationTypes.length],
      read: i % 3 === 0,
      link: i % 2 === 0 ? `/deals/${deals[i % deals.length]._id}` : undefined,
      relatedEntityType: i % 2 === 0 ? 'deal' : 'lead',
      relatedEntityId: i % 2 === 0 ? String(deals[i % deals.length]._id) : String(leads[i % leads.length]._id),
    })),
  );
  console.log(`Seeded ${notifications.length} notifications`);

  // --- Threads (10) ------------------------------------------------------
  const threads = await ThreadModel.insertMany(
    Array.from({ length: 10 }, (_, i) => ({
      title: [
        'Acme Corp renewal strategy', 'Q3 pipeline review', 'New hire onboarding', 'Product feedback thread',
        'Enterprise deal blockers', 'Marketing campaign ideas', 'Support escalation - Globex', 'Roadmap planning',
        'Customer success check-in', 'Sales team sync',
      ][i],
      participants: [contactNames[i % contactNames.length], contactNames[(i + 1) % contactNames.length]],
      messages: [
        {
          author: contactNames[i % contactNames.length],
          text: `Kicking off discussion on this topic.`,
          timestamp: daysFromNow(-i),
        },
        {
          author: contactNames[(i + 1) % contactNames.length],
          text: `Agreed, let's align on next steps.`,
          timestamp: daysFromNow(-i + 1),
        },
      ],
      tags: [['deals'], ['pipeline'], ['hr'], ['product'], ['sales']][i % 5],
      unread: i % 4,
    })),
  );
  console.log(`Seeded ${threads.length} threads`);

  // --- Shared notes (10) --------------------------------------------------
  const sharedNotes = await SharedNoteModel.insertMany(
    Array.from({ length: 10 }, (_, i) => ({
      title: [
        'Acme Corp - key stakeholders', 'Pricing objection handling', 'Competitor comparison notes',
        'Onboarding checklist template', 'Discovery call script', 'Renewal talking points',
        'Product FAQ for sales', 'Customer success playbook', 'Demo environment setup', 'Legal contract clauses',
      ][i],
      content: `Shared note content covering important details for topic #${i + 1}.`,
      author: contactNames[i % contactNames.length],
      tags: [['notes'], ['sales'], ['product'], ['legal']][i % 4],
    })),
  );
  console.log(`Seeded ${sharedNotes.length} shared notes`);

  // --- Templates (10) -----------------------------------------------------
  const templateCategories = Object.values(TemplateCategory);
  const templates = await TemplateModel.insertMany(
    Array.from({ length: 10 }, (_, i) => ({
      name: [
        'Cold Outreach - Intro', 'Follow-up After Demo', 'Proposal Send-off', 'Onboarding Welcome',
        'Renewal Reminder', 'Re-engagement Nudge', 'Meeting Confirmation', 'Contract Signed - Thank You',
        'Feature Announcement', 'Customer Feedback Request',
      ][i],
      subject: `{{first_name}}, ${['quick question', 'thanks for your time', 'next steps', 'welcome aboard', 'renewal coming up'][i % 5]}`,
      content: `Hi {{contact_name}},\n\nThis is a template body for scenario #${i + 1}. Looking forward to connecting.\n\nBest,\n{{sender_name}}`,
      category: templateCategories[i % templateCategories.length],
      tags: [['email'], ['sales'], ['onboarding'], ['renewal']][i % 4],
      usageCount: i * 3,
      lastUsedAt: daysFromNow(-i),
    })),
  );
  console.log(`Seeded ${templates.length} templates`);

  // --- Integrations (10) --------------------------------------------------
  const integrationCategories = Object.values(IntegrationCategory);
  const integrationStatuses = Object.values(IntegrationStatus);
  const integrationDefs = [
    ['Slack', 'slack', IntegrationCategory.COMMUNICATION],
    ['Google Workspace', 'google-workspace', IntegrationCategory.PRODUCTIVITY],
    ['Stripe', 'stripe', IntegrationCategory.PAYMENTS],
    ['Salesforce', 'salesforce', IntegrationCategory.CRM],
    ['Zapier', 'zapier', IntegrationCategory.AUTOMATION],
    ['HubSpot', 'hubspot', IntegrationCategory.MARKETING],
    ['Zoom', 'zoom', IntegrationCategory.VIDEO],
    ['LinkedIn', 'linkedin', IntegrationCategory.SOCIAL],
    ['Microsoft Teams', 'teams', IntegrationCategory.COMMUNICATION],
    ['Mailchimp', 'mailchimp', IntegrationCategory.MARKETING],
  ] as const;
  const integrations = await IntegrationModel.insertMany(
    integrationDefs.map(([name, iconKey, category], i) => {
      const status = integrationStatuses[i % integrationStatuses.length];
      return {
        name,
        description: `Connect ${name} to sync data automatically with your CRM workflows.`,
        category,
        iconKey,
        status,
        ...(status === IntegrationStatus.CONNECTED ? { connectedAt: daysFromNow(-i) } : {}),
      };
    }),
  );
  console.log(`Seeded ${integrations.length} integrations`);

  // --- Email messages (10) ------------------------------------------------
  const mailboxes = Object.values(EmailMailbox);
  const emailMessages = await EmailMessageModel.insertMany(
    Array.from({ length: 10 }, (_, i) => {
      const mailbox = mailboxes[i % mailboxes.length];
      return {
        mailbox,
        from: mailbox === EmailMailbox.SENT ? 'me@ourcrm.com' : contacts[i % contacts.length].email,
        to: mailbox === EmailMailbox.SENT ? [contacts[i % contacts.length].email] : ['me@ourcrm.com'],
        subject: [
          'Re: Pricing proposal', 'Following up on our call', 'Contract attached', 'Quick question about the demo',
          'Renewal terms', 'Meeting notes', 'Welcome to the platform', 'Invoice for Q3', 'Feature request',
          'Thanks for the intro',
        ][i],
        body: `<p>Hi there,</p><p>This is email body content for message #${i + 1}.</p><p>Best regards</p>`,
        read: i % 2 === 0,
        starred: i % 4 === 0,
        sentAt: mailbox === EmailMailbox.SENT ? daysFromNow(-i) : undefined,
        receivedAt: mailbox === EmailMailbox.INBOX ? daysFromNow(-i) : undefined,
        relatedEntityType: 'contact',
        relatedEntityId: String(contacts[i % contacts.length]._id),
      };
    }),
  );
  console.log(`Seeded ${emailMessages.length} email messages`);

  // --- Workflows (10) + Workflow runs (10) --------------------------------
  const workflowStatuses = Object.values(WorkflowStatus);
  const workflowDefs = [
    'New Lead Welcome Sequence', 'Deal Won Celebration', 'Task Reminder Automation', 'Meeting Follow-up',
    'Lead Scoring Update', 'Contract Renewal Alert', 'Onboarding Checklist', 'Re-engagement Campaign',
    'Support Ticket Escalation', 'Quarterly Review Reminder',
  ];
  const workflows = await WorkflowModel.insertMany(
    workflowDefs.map((name, i) => {
      const triggerNode = { id: 'trigger-1', type: 'triggerNode', position: { x: 0, y: 0 }, data: { icon: 'zap', label: 'New Lead Created' } };
      const actionNode = { id: 'action-1', type: 'actionNode', position: { x: 250, y: 0 }, data: { icon: 'task', label: 'Create Follow-up Task' } };
      return {
        name,
        description: `Automates ${name.toLowerCase()} for the sales team.`,
        status: workflowStatuses[i % workflowStatuses.length],
        trigger: { type: 'lead.created', config: {} },
        nodes: [triggerNode, actionNode],
        edges: [{ id: 'e1', source: 'trigger-1', target: 'action-1' }],
      };
    }),
  );
  console.log(`Seeded ${workflows.length} workflows`);

  const runStatuses = Object.values(WorkflowRunStatus);
  const workflowRuns = await WorkflowRunModel.insertMany(
    workflows.map((wf, i) => ({
      workflowId: String(wf._id),
      startedAt: daysFromNow(-i),
      finishedAt: daysFromNow(-i),
      status: runStatuses[i % runStatuses.length],
      steps: [
        { nodeId: 'trigger-1', type: 'triggerNode', status: 'success', timestamp: daysFromNow(-i) },
        { nodeId: 'action-1', type: 'action.create_task', status: 'success', output: { note: 'task created' }, timestamp: daysFromNow(-i) },
      ],
      triggerPayload: { leadName: leadNames[i % leadNames.length] },
    })),
  );
  console.log(`Seeded ${workflowRuns.length} workflow runs`);

  console.log('\nSeeding complete.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
