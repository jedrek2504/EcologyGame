//"use strict";
import db from "../database.js";
// const db = require("../database.js");
import { IntermoduleUserManager } from "./IntermoduleUserManager.js";
import { User } from "./User.js";
import { UMMEventFilter } from "./UMMEventFilter.js";
import {EventStream} from "../lib/EventStream.js";

export class UserManager implements IntermoduleUserManager {
    getUsers(filtrator : (user : User) => boolean) : User[] {
        return [];
    }
    createUser(username : string, 
               email : string, 
               password : string) : Promise<User> {
        
        return new Promise(async (resolve, reject)=> {
            if (await db.Person.findOne({where: {username: username}})) {
                reject("Trying to create existing user");
            }
            else if (await db.Person.findOne({where: {email: email}})) {
                reject("Email is already taken");
            }
            else {
                let p : any = await db.Person.create({
                    username: username,
                    password: password,
                    email: email
                });
                if (p[0] == 0) {
                    reject("Database error while creating user")
                }
                resolve(p); // Dummy / Why would I return a User instance?
            }
        });
    }

    deleteUser(user : User) : boolean {
        return false;
    }

    login(username : string, password : string) : User | null {
        return null;
    }

    logout(target : User) : void {
        
    }

    getEventStream(streamFilter : UMMEventFilter) : EventStream {
        return EventStream.getInstance();
    }
    private constructor() {
        
    }
    private static _instance: UserManager
    public static getInstance () : UserManager {
      if (!this._instance) this._instance = new UserManager()
      return this._instance
    }
}

export default UserManager.getInstance();