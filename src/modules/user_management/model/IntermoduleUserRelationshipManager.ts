import {User} from './User.js'
import { Relationship } from './Relationship.js';
export interface IntermoduleUserRelationshipManager {
    listUserRelationships(target : User) : Relationship[];
}