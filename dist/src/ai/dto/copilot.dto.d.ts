export declare class ChatMessageDto {
    role: 'user' | 'assistant';
    content: string;
}
export declare class CopilotDto {
    message: string;
    history?: ChatMessageDto[];
}
