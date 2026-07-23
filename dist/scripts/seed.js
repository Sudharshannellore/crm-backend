"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mongoose_1 = __importDefault(require("mongoose"));
const lead_schema_1 = require("../src/leads/schemas/lead.schema");
const organization_schema_1 = require("../src/organizations/schemas/organization.schema");
const contact_schema_1 = require("../src/contacts/schemas/contact.schema");
const deal_schema_1 = require("../src/deals/schemas/deal.schema");
const task_schema_1 = require("../src/tasks/schemas/task.schema");
const meeting_schema_1 = require("../src/meetings/schemas/meeting.schema");
const campaign_schema_1 = require("../src/campaigns/schemas/campaign.schema");
const notification_schema_1 = require("../src/notifications/schemas/notification.schema");
const thread_schema_1 = require("../src/collaboration/schemas/thread.schema");
const shared_note_schema_1 = require("../src/collaboration/schemas/shared-note.schema");
const template_schema_1 = require("../src/templates/schemas/template.schema");
const integration_schema_1 = require("../src/integrations/schemas/integration.schema");
const email_message_schema_1 = require("../src/email/schemas/email-message.schema");
const workflow_schema_1 = require("../src/workflows/schemas/workflow.schema");
const workflow_run_schema_1 = require("../src/workflows/schemas/workflow-run.schema");
function daysFromNow(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d;
}
async function seed() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not set (check .env)');
    }
    await mongoose_1.default.connect(uri);
    console.log('Connected to MongoDB');
    const LeadModel = mongoose_1.default.model(lead_schema_1.Lead.name, lead_schema_1.LeadSchema);
    const OrganizationModel = mongoose_1.default.model(organization_schema_1.Organization.name, organization_schema_1.OrganizationSchema);
    const ContactModel = mongoose_1.default.model(contact_schema_1.Contact.name, contact_schema_1.ContactSchema);
    const DealModel = mongoose_1.default.model(deal_schema_1.Deal.name, deal_schema_1.DealSchema);
    const TaskModel = mongoose_1.default.model(task_schema_1.Task.name, task_schema_1.TaskSchema);
    const MeetingModel = mongoose_1.default.model(meeting_schema_1.Meeting.name, meeting_schema_1.MeetingSchema);
    const CampaignModel = mongoose_1.default.model(campaign_schema_1.Campaign.name, campaign_schema_1.CampaignSchema);
    const NotificationModel = mongoose_1.default.model(notification_schema_1.Notification.name, notification_schema_1.NotificationSchema);
    const ThreadModel = mongoose_1.default.model(thread_schema_1.Thread.name, thread_schema_1.ThreadSchema);
    const SharedNoteModel = mongoose_1.default.model(shared_note_schema_1.SharedNote.name, shared_note_schema_1.SharedNoteSchema);
    const TemplateModel = mongoose_1.default.model(template_schema_1.Template.name, template_schema_1.TemplateSchema);
    const IntegrationModel = mongoose_1.default.model(integration_schema_1.Integration.name, integration_schema_1.IntegrationSchema);
    const EmailMessageModel = mongoose_1.default.model(email_message_schema_1.EmailMessage.name, email_message_schema_1.EmailMessageSchema);
    const WorkflowModel = mongoose_1.default.model(workflow_schema_1.Workflow.name, workflow_schema_1.WorkflowSchema);
    const WorkflowRunModel = mongoose_1.default.model(workflow_run_schema_1.WorkflowRun.name, workflow_run_schema_1.WorkflowRunSchema);
    const orgNames = [
        'Acme Corp', 'Globex Industries', 'Initech Solutions', 'Umbrella Holdings',
        'Stark Enterprises', 'Wayne Technologies', 'Wonka Foods', 'Hooli Inc',
        'Pied Piper', 'Aperture Science',
    ];
    const industries = Object.values(organization_schema_1.Industry);
    const orgTypes = Object.values(organization_schema_1.OrganizationType);
    const organizations = await OrganizationModel.insertMany(orgNames.map((name, i) => ({
        name,
        website: `https://${name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
        industry: industries[i % industries.length],
        type: orgTypes[i % orgTypes.length],
        employeeCount: 50 + i * 120,
        annualRevenue: 500000 + i * 750000,
        billingAddress: `${100 + i} Market Street, San Francisco, CA`,
        phone: `+1-415-555-01${String(i).padStart(2, '0')}`,
        description: `${name} is a leading player in its industry, focused on growth and innovation.`,
    })));
    console.log(`Seeded ${organizations.length} organizations`);
    const contactNames = [
        'Sarah Thompson', 'Michael Chen', 'Emily Rodriguez', 'David Park', 'Lisa Wang',
        'James Wilson', 'Olivia Martinez', 'Daniel Kim', 'Sophia Patel', 'Ryan Murphy',
    ];
    const contactTypes = Object.values(contact_schema_1.ContactType);
    const contacts = await ContactModel.insertMany(contactNames.map((name, i) => ({
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
    })));
    console.log(`Seeded ${contacts.length} contacts`);
    const leadSources = Object.values(lead_schema_1.LeadSource);
    const leadStatuses = Object.values(lead_schema_1.LeadStatus);
    const leadNames = [
        'Alex Turner', 'Priya Sharma', 'Tom Anderson', 'Nina Volkov', 'Carlos Diaz',
        'Grace Lee', 'Ben Foster', 'Maya Singh', 'Ethan Brooks', 'Zoe Campbell',
    ];
    const leads = await LeadModel.insertMany(leadNames.map((name, i) => {
        const status = leadStatuses[i % leadStatuses.length];
        const qualified = status === lead_schema_1.LeadStatus.QUALIFIED;
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
    }));
    console.log(`Seeded ${leads.length} leads`);
    const dealStages = Object.values(deal_schema_1.DealStage);
    const dealPriorities = Object.values(deal_schema_1.DealPriority);
    const deals = await DealModel.insertMany(orgNames.map((name, i) => ({
        title: `${name} - ${['Cloud Migration', 'Enterprise License', 'Support Contract', 'Expansion Deal', 'Renewal'][i % 5]}`,
        company: name,
        value: 50000 + i * 45000,
        closeDate: daysFromNow(15 + i * 5),
        owner: contactNames[i % contactNames.length],
        stage: dealStages[i % dealStages.length],
        priority: dealPriorities[i % dealPriorities.length],
        probability: [20, 40, 60, 75, 90, 10][i % 6],
        description: `Deal in progress with ${name} for ${['cloud infrastructure', 'security suite', 'analytics platform'][i % 3]}.`,
    })));
    console.log(`Seeded ${deals.length} deals`);
    const taskPriorities = Object.values(task_schema_1.TaskPriority);
    const taskCategories = Object.values(task_schema_1.TaskCategory);
    const taskStatuses = Object.values(task_schema_1.TaskStatus);
    const tasks = await TaskModel.insertMany(Array.from({ length: 10 }, (_, i) => ({
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
    })));
    console.log(`Seeded ${tasks.length} tasks`);
    const meetingTypes = Object.values(meeting_schema_1.MeetingType);
    const meetings = await MeetingModel.insertMany(Array.from({ length: 10 }, (_, i) => ({
        title: [
            'Discovery Call', 'Product Demo', 'Contract Negotiation', 'Kickoff Meeting', 'QBR Review',
            'Technical Deep Dive', 'Renewal Discussion', 'Onboarding Session', 'Executive Briefing', 'Support Sync',
        ][i],
        type: meetingTypes[i % meetingTypes.length],
        date: daysFromNow(i + 1),
        time: `${String(9 + (i % 8)).padStart(2, '0')}:30`,
        duration: [30, 45, 60][i % 3],
        location: meetingTypes[i % meetingTypes.length] === meeting_schema_1.MeetingType.IN_PERSON
            ? '100 Market Street, Suite 500'
            : meetingTypes[i % meetingTypes.length] === meeting_schema_1.MeetingType.PHONE
                ? `+1-555-900-${String(1000 + i)}`
                : `https://meet.example.com/room-${i}`,
        agenda: `Discuss ${['pricing', 'roadmap', 'integration', 'renewal terms', 'support plan'][i % 5]} with ${organizations[i % organizations.length].name}.`,
        reminders: [10, 15, 30][i % 3],
    })));
    console.log(`Seeded ${meetings.length} meetings`);
    const campaignTypes = Object.values(campaign_schema_1.CampaignType);
    const campaignStatuses = Object.values(campaign_schema_1.CampaignStatus);
    const campaigns = await CampaignModel.insertMany(Array.from({ length: 10 }, (_, i) => ({
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
    })));
    console.log(`Seeded ${campaigns.length} campaigns`);
    const notificationTypes = Object.values(notification_schema_1.NotificationType);
    const notifications = await NotificationModel.insertMany(Array.from({ length: 10 }, (_, i) => ({
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
    })));
    console.log(`Seeded ${notifications.length} notifications`);
    const threads = await ThreadModel.insertMany(Array.from({ length: 10 }, (_, i) => ({
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
    })));
    console.log(`Seeded ${threads.length} threads`);
    const sharedNotes = await SharedNoteModel.insertMany(Array.from({ length: 10 }, (_, i) => ({
        title: [
            'Acme Corp - key stakeholders', 'Pricing objection handling', 'Competitor comparison notes',
            'Onboarding checklist template', 'Discovery call script', 'Renewal talking points',
            'Product FAQ for sales', 'Customer success playbook', 'Demo environment setup', 'Legal contract clauses',
        ][i],
        content: `Shared note content covering important details for topic #${i + 1}.`,
        author: contactNames[i % contactNames.length],
        tags: [['notes'], ['sales'], ['product'], ['legal']][i % 4],
    })));
    console.log(`Seeded ${sharedNotes.length} shared notes`);
    const templateCategories = Object.values(template_schema_1.TemplateCategory);
    const templates = await TemplateModel.insertMany(Array.from({ length: 10 }, (_, i) => ({
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
    })));
    console.log(`Seeded ${templates.length} templates`);
    const integrationCategories = Object.values(integration_schema_1.IntegrationCategory);
    const integrationStatuses = Object.values(integration_schema_1.IntegrationStatus);
    const integrationDefs = [
        ['Slack', 'slack', integration_schema_1.IntegrationCategory.COMMUNICATION],
        ['Google Workspace', 'google-workspace', integration_schema_1.IntegrationCategory.PRODUCTIVITY],
        ['Stripe', 'stripe', integration_schema_1.IntegrationCategory.PAYMENTS],
        ['Salesforce', 'salesforce', integration_schema_1.IntegrationCategory.CRM],
        ['Zapier', 'zapier', integration_schema_1.IntegrationCategory.AUTOMATION],
        ['HubSpot', 'hubspot', integration_schema_1.IntegrationCategory.MARKETING],
        ['Zoom', 'zoom', integration_schema_1.IntegrationCategory.VIDEO],
        ['LinkedIn', 'linkedin', integration_schema_1.IntegrationCategory.SOCIAL],
        ['Microsoft Teams', 'teams', integration_schema_1.IntegrationCategory.COMMUNICATION],
        ['Mailchimp', 'mailchimp', integration_schema_1.IntegrationCategory.MARKETING],
    ];
    const integrations = await IntegrationModel.insertMany(integrationDefs.map(([name, iconKey, category], i) => {
        const status = integrationStatuses[i % integrationStatuses.length];
        return {
            name,
            description: `Connect ${name} to sync data automatically with your CRM workflows.`,
            category,
            iconKey,
            status,
            ...(status === integration_schema_1.IntegrationStatus.CONNECTED ? { connectedAt: daysFromNow(-i) } : {}),
        };
    }));
    console.log(`Seeded ${integrations.length} integrations`);
    const mailboxes = Object.values(email_message_schema_1.EmailMailbox);
    const emailMessages = await EmailMessageModel.insertMany(Array.from({ length: 10 }, (_, i) => {
        const mailbox = mailboxes[i % mailboxes.length];
        return {
            mailbox,
            from: mailbox === email_message_schema_1.EmailMailbox.SENT ? 'me@ourcrm.com' : contacts[i % contacts.length].email,
            to: mailbox === email_message_schema_1.EmailMailbox.SENT ? [contacts[i % contacts.length].email] : ['me@ourcrm.com'],
            subject: [
                'Re: Pricing proposal', 'Following up on our call', 'Contract attached', 'Quick question about the demo',
                'Renewal terms', 'Meeting notes', 'Welcome to the platform', 'Invoice for Q3', 'Feature request',
                'Thanks for the intro',
            ][i],
            body: `<p>Hi there,</p><p>This is email body content for message #${i + 1}.</p><p>Best regards</p>`,
            read: i % 2 === 0,
            starred: i % 4 === 0,
            sentAt: mailbox === email_message_schema_1.EmailMailbox.SENT ? daysFromNow(-i) : undefined,
            receivedAt: mailbox === email_message_schema_1.EmailMailbox.INBOX ? daysFromNow(-i) : undefined,
            relatedEntityType: 'contact',
            relatedEntityId: String(contacts[i % contacts.length]._id),
        };
    }));
    console.log(`Seeded ${emailMessages.length} email messages`);
    const workflowStatuses = Object.values(workflow_schema_1.WorkflowStatus);
    const workflowDefs = [
        'New Lead Welcome Sequence', 'Deal Won Celebration', 'Task Reminder Automation', 'Meeting Follow-up',
        'Lead Scoring Update', 'Contract Renewal Alert', 'Onboarding Checklist', 'Re-engagement Campaign',
        'Support Ticket Escalation', 'Quarterly Review Reminder',
    ];
    const workflows = await WorkflowModel.insertMany(workflowDefs.map((name, i) => {
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
    }));
    console.log(`Seeded ${workflows.length} workflows`);
    const runStatuses = Object.values(workflow_run_schema_1.WorkflowRunStatus);
    const workflowRuns = await WorkflowRunModel.insertMany(workflows.map((wf, i) => ({
        workflowId: String(wf._id),
        startedAt: daysFromNow(-i),
        finishedAt: daysFromNow(-i),
        status: runStatuses[i % runStatuses.length],
        steps: [
            { nodeId: 'trigger-1', type: 'triggerNode', status: 'success', timestamp: daysFromNow(-i) },
            { nodeId: 'action-1', type: 'action.create_task', status: 'success', output: { note: 'task created' }, timestamp: daysFromNow(-i) },
        ],
        triggerPayload: { leadName: leadNames[i % leadNames.length] },
    })));
    console.log(`Seeded ${workflowRuns.length} workflow runs`);
    console.log('\nSeeding complete.');
    await mongoose_1.default.disconnect();
}
seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map