import { GameUser } from "./GameUser.js"
import {ForumUser} from "./ForumUser.js"

import db from "../database.js";
import { Identifier, Model } from "sequelize";

/**
 * Class representing an user actor for the system
 * The objects are synchronized with the database, as the class acts as a database DAO
 * 
 * TODO : Test this class in database.text.js or in other way verify if it's working properly
 * 
 * @note NOT TESTED !!!
 * 
 */

export class User implements GameUser, ForumUser {
    private id : Number;
    private dbUser : any;
	private sessionID: string | null;

    /*
        This might be ugly, as the CRUD methods might need to be async and return Promises instead
    */
    private async dbUserFetch() {
        this.dbUser = await db.Person.findByPk(this.id as Identifier);
    }
    /*
        Same here
    */
    private dbSave(fields : any) : boolean {
        let succeeded : boolean = false;
        (async () => {
            if (await (this.dbUser as Model).save({ fields: fields})) {
                succeeded = true;
            }
        })();
        return succeeded;
    }

    constructor(id : Number, session: string | null) {
        this.id = id;
		this.sessionID = session;
        this.dbUserFetch();
    }

    getScore() : number {
        return this.dbUser.score;
    }

	getSessionId(): string | null {
		return this.sessionID;
	}

    getId() : string {
        return this.id as unknown as string;
    }
    setScore(score : Number) : boolean {
        this.dbUser.score = score;
        let succeeded : boolean = false;
        /* (async () => {
                if (await (this.dbUser as Model).save({ fields: ['score']})) {
                    succeeded = true;
                }
            }
        )(); */
        //this.dbSave(['score'], (s : boolean) => succeeded = s);
        //return succeeded;
        return this.dbSave(['score']);
    }
    getUsername() : string {
        return this.dbUser.username;
    }
    setUsername(username : string) : boolean {
        this.dbUser.username = username;
        /*let succeeded : boolean = false;
        this.dbSave(['username'], (s : boolean) => succeeded = s);
        return succeeded;*/
        return this.dbSave(['username']);
    }
    getEmail() : string {
        return this.dbUser.email;
    }
    setEmail(email : string) : boolean {
        this.dbUser.email = email;
        /*let succeeded : boolean = false;
        this.dbSave(['email'], (s : boolean) => succeeded = s);
        return succeeded;*/
        return this.dbSave(['email']);
    }
    hasContributedToForum() : boolean {
        return this.dbUser.is_forum_contributor;
    }
    markAsForumContributor() : boolean {
        this.dbUser.is_forum_contributor = true;
        return this.dbSave(['is_forum_contributor']);
    }


    public static getInstance (id : Number, session: string | null) : User {
        return new User(id, session);
    }
}