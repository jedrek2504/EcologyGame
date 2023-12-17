import {User} from "./User.js"
import {EventStream} from "../lib/EventStream.js"
import { UMMEventFilter } from "./UMMEventFilter.js"
import { GameUser } from "./GameUser.js";
import { ForumUser } from "./ForumUser.js";
import { LeaderboardUser } from "./LeaderboardUser.js";
export interface IntermoduleUserManager {
    getUsers(filtrator: (user : User) => boolean) : User[];
    getUserBySessionKey(token: string): Promise<GameUser | ForumUser | LeaderboardUser | null>

    /**
     * 
     * @param streamFilter 
     * @note THE STREAM RETURNED BY THIS FUNCTION IS ENTIRELY FOR BACKEND-BACKEND COMMUNICATION. 
     *       If you want to pass the stream to your module's frontend, you need to implement SSE (Server Sent Events) or Websocket on the backend and frontend side of your module
     */
    getEventStream(streamFilter : UMMEventFilter) : EventStream;
}