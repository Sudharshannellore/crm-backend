export declare class ChatMessageDto {
    role: 'user' | 'assistant';
    content: string;
}
export declare class PageContextDto {
    entityType?: string;
    entityId?: string;
    path?: string;
}
export declare class CopilotDto {
    message: string;
    history?: ChatMessageDto[];
    pageContext?: PageContextDto;
}
