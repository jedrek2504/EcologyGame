import { IntermoduleUserRelationshipManager } from "./IntermoduleUserRelationshipManager.js";
import {User} from "./User.js";
import { Relationship } from "./Relationship.js";
import db from "../database.js";
import { Op } from "sequelize";

/**
 * @note NOT tested
 */
export class UserRelationshipManager implements IntermoduleUserRelationshipManager {
    /**
     * 
     * @param source 
     * @param target 
     * @returns Relationship instance or null if the database query failed
     */
    createRelationship(source : User, target : User) : Promise<void> {
        /*if (source.getId() == target.getId()) {
            throw Error("Cannot create user relation with himself");
        }
        let relationship = new Relationship(source, target);
        if (relationship.executeBind()) {
            return relationship;
        }
        else {
            return null;
        }*/
        return new Promise<void>((resolve, reject) => {
            if (source.getId() == target.getId()) {
                reject("Cannot create user relation with himself");
            }
            let relationship = new Relationship(source, target);
            relationship.executeBind().then(() => {
                resolve();
            }).catch((error : any) => {
                reject(`Error while executing relationship bind: ${error}`);
            });
        });
    }

    /**
     * 
     * @param relationship 
     * @returns True if the detabase query was successfully executed
     */
    deleteRelationship(relationship : Relationship) : Promise<void> {
        //return relationship.destroy();
        return new Promise<void>((resolve, reject) => {
            relationship.destroy().then(() => {
                resolve();
            }).catch((error : any) => {
                reject(`Error while executing Relationship::destroy(): ${error}`);
            });
        });
    }

    /**
     * 
     * @param target
     * @returns Array of relationship instances connected to the given user
     * or null if database failed
     */
    async listUserRelationships(targetUserID : string) : Promise<Relationship[] | null> {
        //let targetID : Number = target.getId() as unknown as Number;

        try {
            let rels : any[] = await db.Relationship.findAll({
                where: {
                    [Op.or]: [
                        { first_user_id: targetUserID },
                        { second_user_id: targetUserID }
                    ]
                }
            });
            // Return an array of relationship instances 
            return rels.map((r)=>{
                return new Relationship(
                    new User(r.first_user_id/*#S , null*/),
                    new User(r.second_user_id/*#S, null*/)
                );
            })
        } catch (error) {
            console.error('Database error:', error);
            throw new Error("Database error: " + error);
            //return null;
        }
    }

    private static _instance: UserRelationshipManager
    public static getInstance () : UserRelationshipManager {
      if (!this._instance) this._instance = new UserRelationshipManager()
      return this._instance
    }
}