import {User} from './User.js'
import { Relationship } from './Relationship.js';
export interface IntermoduleUserRelationshipManager {
    listUserRelationships(targetUserID : string) : Promise<Relationship[] | null>;

    createRelationship(source : User, target : User) : Promise<void>/*Relationship | null*/;

    deleteRelationship(relationship : Relationship) : Promise<void>/*boolean*/;
}