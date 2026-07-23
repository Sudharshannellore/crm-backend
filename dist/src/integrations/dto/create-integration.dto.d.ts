import { IntegrationCategory, IntegrationStatus } from '../schemas/integration.schema';
export declare class CreateIntegrationDto {
    name: string;
    description?: string;
    category: IntegrationCategory;
    iconKey?: string;
    status?: IntegrationStatus;
    connectedAt?: Date;
    config?: Record<string, any>;
}
