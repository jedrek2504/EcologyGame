//"use strict";
import db from "../database.js";
// const db = require("../database.js");
import { IntermoduleUserManager } from "./IntermoduleUserManager.js";
import { User } from "./User.js";
import { UMMEventFilter } from "./UMMEventFilter.js";
import {EventStream} from "../lib/EventStream.js";
import utils from "../utils.js";

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

    async deleteUser(user: User): Promise<boolean> {
        const userInstance = await db.Person.findByPk(user.getId());
		const wasFound = userInstance != null;
		await userInstance?.destroy();
		return wasFound;
    }

    async login(username: string, password: string): Promise<User | null> {
		const userInstance: any = await db.Person.findOne({
			where: {
				"username": username,
				"password": password,
			}
		});
		if (userInstance == null) return null;
		let generatedId;
		do {
			generatedId = utils.makeid(64);
		} while (await db.LoginInstance.findByPk(generatedId));
		const login: any = await db.LoginInstance.create({
			login_id: generatedId,
			user_id: userInstance.user_id
		});
        return new User(userInstance.user_id);
    }

    async logout(target: User): Promise<void> {
		await db.LoginInstance.destroy({
			where: {
				"user_id": target.getId(),
			}
		})
    }

	async getUserBySession(token: string): Promise<User | null> {
		const loginInstance: any = await db.LoginInstance.findByPk(token);
		if (loginInstance == null) return null;
		return new User(loginInstance.user_id);
	}

    getEventStream(streamFilter: UMMEventFilter): EventStream {
        return EventStream.getInstance();
    }
    private constructor() {
        
    }
    private static _instance: UserManager
    public static getInstance(): UserManager {
      if (!this._instance) this._instance = new UserManager()
      return this._instance
    }
}

export default UserManager.getInstance();