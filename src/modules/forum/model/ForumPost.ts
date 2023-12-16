/* forum/model/ForumPost.ts */

import { ForumUser } from "../../user_management/model/ForumUser.js";

export class ForumPost {
    private id: string;
    private title: string;
    private content: string;
    private author: ForumUser;
    private timestamp: Date;

    constructor(id: string, title: string, content: string, author: ForumUser, timestamp: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.timestamp = timestamp;
    }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

    public getAuthor(): ForumUser {
        return this.author;
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }
}
