import {User} from "./User.js"
import {EventStream} from "../lib/EventStream.js"
import { UMMEventFilter } from "./UMMEventFilter.js"
export interface IntermoduleUserManager {
    getUsers(filtrator: (user : User) => boolean) : User[];
    getEventStream(streamFilter : UMMEventFilter) : EventStream;
}