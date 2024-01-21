import {User} from "./User.js"
import db from "../database.js"
//import { Model } from "sequelize";

/**
 * @note NOT TESTED
 */
export class Relationship {
    private relationship_id : Number = -1;
    //private dbRelationship : any = null;
    public firstUser : User;
    public secondUser : User;
    constructor(firstUser : User, secondUser : User) {
        this.firstUser = firstUser;
        this.secondUser = secondUser;
    }
    executeBind() : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let pk1 : Number = this.firstUser.getId() as unknown as Number;
            let pk2 : Number = this.secondUser.getId() as unknown as Number;

            /*let r : any = [0];
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
            return true;*/
            db.Relationship.create({
                first_user_id: pk1,
                second_user_id: pk2
                /*relationship_id: 2*/
            }).then((r : any) => {
                if (r[0] == 0) {
                    reject("Failed to create relationship: r[0]==0")
                }
                else {
                    //this.dbRelationship = r;
                    resolve();
                }
            }).catch((error : any) => {
                reject(`Error while executing db.Relationship::create: ${error}`);
            });
        });
        
    }
    destroy() : Promise<void> {
        let succeeded : boolean = false;
        
        /*(async() => succeeded = 0 !== await db.Relationship.destroy({
            where: {
                relationship_id: this.dbRelationship.relationship_id
            }
        }))();*/
        return new Promise<void>((resolve, reject) => {
            db.Relationship.destroy({
                where: {
                    //relationship_id: this.dbRelationship.relationship_id
                    first_user_id: this.firstUser.getId(),
                    second_user_id: this.secondUser.getId()
                }
            }).then((result : any) => {
                if (!result) {
                    reject("Failed to delete relationship: falsy result");
                }
                else {
                    resolve();
                }
            });
        });
        //return false;
    }
}