import { ThreadsService } from './threads.service';
export declare class MentionsController {
    private readonly threadsService;
    constructor(threadsService: ThreadsService);
    getMentions(): Promise<{
        id: string;
        text: string;
        author: string;
        createdAt: Date;
        threadId?: string;
    }[]>;
}
