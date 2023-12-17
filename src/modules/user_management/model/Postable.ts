import { ForumUser } from "./ForumUser.js"

export interface Postable {
    getCreator() : ForumUser,
    getDataObject() : any,
    getName() : string,
    //getParent() : Postable,
    getIdentifier() : string
}