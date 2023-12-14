import { UserNotification } from "./UserNotification.js";
import { IntermoduleNotificationManager } from "./IntermoduleNotificationManager.js";
import {User} from './User.js'
export class NotificationManager implements IntermoduleNotificationManager {
    notifyUser(user : User, notification : UserNotification) : boolean {
        return false;
    }
    registerUser(user : User) : boolean {
        return false;
    }
    unregisterUser(user : User) : boolean {
        return false;
    }

    private static _instance: NotificationManager
    public static getInstance () : NotificationManager {
      if (!this._instance) this._instance = new NotificationManager()
      return this._instance
    }
}