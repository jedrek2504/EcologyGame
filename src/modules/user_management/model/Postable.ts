import { ForumUser } from "./ForumUser.js"

interface Postable {
    getCreator() : ForumUser,
    getDataObject() : any,
    getTitle() : string
    getParent() : Postable
}