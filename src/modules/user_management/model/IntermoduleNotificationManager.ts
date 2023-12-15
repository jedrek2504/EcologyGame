import { UserNotification } from "./UserNotification.js"
import {User} from "./User.js"
export interface IntermoduleNotificationManager {
    notifyUser(user : User, notification : UserNotification) : boolean;
}