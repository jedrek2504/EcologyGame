/* forum/model/ForumPost.ts */

import { ForumUser } from "../../user_management/model/ForumUser.js";
import {Postable} from "../../user_management/model/Postable.js";

export class ForumPost implements Postable {
    // private id: string;
    private title: string;
    private content: string;
    private author: ForumUser;
    private timestamp: Date;

    constructor(title: string, content: string, author: ForumUser) {
        // this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.timestamp = new Date(); // Default value is current date
    }

    public getContent(): string {
        return this.content;
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }

    getCreator(): ForumUser {
        return this.author;
    }

    getDataObject(): any {

        return {
            content: this.content,
            date: this.timestamp
        }
    }

    getIdentifier(): string {
        return "";
    }

    getName(): string {
        return this.title;
    }
}
