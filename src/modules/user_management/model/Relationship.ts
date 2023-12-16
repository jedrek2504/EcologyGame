import {User} from "./User.js"
import db from "../database.js"
//import { Model } from "sequelize";

/**
 * @note NOT TESTED
 */
export class Relationship {
    private relationship_id : Number = -1;
    private dbRelationship : any = null;
    public firstUser : User;
    public secondUser : User;
    constructor(firstUser : User, secondUser : User) {
        this.firstUser = firstUser;
        this.secondUser = secondUser;
    }
    executeBind() : boolean {
        let pk1 : Number = this.firstUser.getId() as unknown as Number;
        let pk2 : Number = this.secondUser.getId() as unknown as Number;

        let r : any = [0];
        (async()=>r = await db.Relationship.create({
            first_user_id: pk1,
            second_user_id: pk2
        }))();
        if (r[0] == 0) {
            //reject("Database error while creating relationship")
            return false;
        }
        // resolve(p);
        this.dbRelationship = r;
        return true;
        
    }
    destroy() : boolean {
        let succeeded : boolean = false;
        
        (async() => succeeded = 0 !== await db.Relationship.destroy({
            where: {
                relationship_id: this.dbRelationship.relationship_id
            }
        }))();
        return succeeded;
        //return false;
    }
}