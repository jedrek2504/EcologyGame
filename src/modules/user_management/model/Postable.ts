import { ForumUser } from "./ForumUser.js"

export interface Postable {
    getCreator() : ForumUser,
    getDataObject() : any,
    getName() : string,
    getIdentifier() : string
}