import {User} from "./User.js"
export class Relationship {
    public firstUser : User;
    public secondUser : User;
    constructor(firstUser : User, secondUser : User) {
        this.firstUser = firstUser;
        this.secondUser = secondUser;
    }
    destroy() : boolean {
        return false;
    }
}