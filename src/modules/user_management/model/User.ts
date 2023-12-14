import { GameUser } from "./GameUser.js"
import {ForumUser} from "./ForumUser.js"

import db from "../database.js";

/**
 * Class representing an user actor for the system
 * The objects are synchronized with the database, as the class acts as a database DAO
 */
export class User implements GameUser, ForumUser {
    getScore() : number {
        return 0;
    }
    getId() : string {
        return "";
    }
    setScore() : boolean {
        return false;
    }
    getUsername() : string {
        return "";
    }
    setUsername(username : string) : boolean {
        return false;
    }
    getEmail() : string {
        return "";
    }
    setEmail(email : string) : boolean {
        return false;
    }
    hasContributedToForum() : boolean {
        return false;
    }
    markAsForumContributor() : boolean {
        return false;
    }


    public static getInstance () : User {
        return new User();
    }
}