export class UserNotification {
    private id : string;
    private title : string;
    private message : string;
    constructor() {
        this.id = "<no id>";
        this.title = "<no title>";
        this.message = "<empty message>";
    }
    setTitle(title : string) : void {
        this.title = title;
    }
    setMessage(message : string) : void {
        this.message = message;
    }
    getTitle() : string {
        return this.title;
    }
    getMessage() : string {
        return this.message;
    }
}