import { IntermoduleUserRelationshipManager } from "./IntermoduleUserRelationshipManager.js";
import {User} from "./User.js";
import { Relationship } from "./Relationship.js";
import db from "../database.js";
import { Op } from "sequelize";
export class UserRelationshipManager implements IntermoduleUserRelationshipManager {
    /**
     * 
     * @param source 
     * @param target 
     * @returns Relationship instance or null if the database query failed
     */
    createRelationship(source : User, target : User) : Relationship | null{
        if (source.getId() == target.getId()) {
            throw Error("Cannot create user relation with himself");
        }
        let relationship = new Relationship(source, target);
        if (relationship.executeBind()) {
            return relationship;
        }
        else {
            return null;
        }
    }

    /**
     * 
     * @param relationship 
     * @returns True if the detabase query was successfully executed
     */
    deleteRelationship(relationship : Relationship) : boolean {
        return relationship.destroy();
    }

    /**
     * 
     * @param target 
     * @returns Array of relationship instances connected to the given user
     * or null if database failed 
     */
    listUserRelationships(target : User) : Relationship[] | null {
        let targetID : Number = target.getId() as unknown as Number;
        db.Relationship.findAll({
            where: {
                [Op.or]: [
                  { a: targetID },
                  { b: targetID }
                ]
            }
        });
        return [];
    }

    private static _instance: UserRelationshipManager
    public static getInstance () : UserRelationshipManager {
      if (!this._instance) this._instance = new UserRelationshipManager()
      return this._instance
    }
}