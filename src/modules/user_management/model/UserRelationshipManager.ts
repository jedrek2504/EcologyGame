import { IntermoduleUserRelationshipManager } from "./IntermoduleUserRelationshipManager.js";
import {User} from "./User.js";
import { Relationship } from "./Relationship.js";
export class UserRelationshipManager implements IntermoduleUserRelationshipManager {
    createRelationship(source : User, target : User) : Relationship | null {
        return null;
    }
    deleteRelationship(relationship : Relationship) : boolean {
        return false;
    }
    listUserRelationships(target : User) : Relationship[] {
        return [];
    }

}