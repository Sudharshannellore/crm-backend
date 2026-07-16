import { Industry, OrganizationType } from '../schemas/organization.schema';
export declare class CreateOrganizationDto {
    name: string;
    website?: string;
    industry?: Industry;
    type?: OrganizationType;
    employeeCount?: number;
    annualRevenue?: number;
    billingAddress?: string;
    phone?: string;
    description?: string;
}
