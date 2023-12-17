import {User} from './User.js'
import { Relationship } from './Relationship.js';
export interface IntermoduleUserRelationshipManager {
    listUserRelationships(targetUserID : string) : Promise<Relationship[] | null>;
}