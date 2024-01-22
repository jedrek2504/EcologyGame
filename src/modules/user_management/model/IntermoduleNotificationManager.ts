import { UserNotification } from "./UserNotification.js"
import {User} from "./User.js"
export interface IntermoduleNotificationManager {
    notifyUser(userID : string, notification : UserNotification) : Promise<void>;
}