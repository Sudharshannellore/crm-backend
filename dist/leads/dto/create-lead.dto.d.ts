import { LeadSource, LeadStatus } from '../schemas/lead.schema';
export declare class CreateLeadDto {
    name: string;
    company: string;
    email: string;
    phone?: string;
    value?: number;
    source?: LeadSource;
    status?: LeadStatus;
    territory?: string;
    notes?: string;
    score?: number;
}
