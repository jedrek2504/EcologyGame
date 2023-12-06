class UserNotification {
    private id : string;
    private title : string;
    private message : string;
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