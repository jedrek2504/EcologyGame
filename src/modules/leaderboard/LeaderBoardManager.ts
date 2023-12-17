import { IntermoduleUserManager } from "../user_management/model/IntermoduleUserManager.js";
import { IntermoduleNotificationManager } from "../user_management/model/IntermoduleNotificationManager.js";
import { Leaderboard } from "./LeaderBoard.js";
import { User } from "./User.js";

export class LeaderboardManager {
    private userManager: IntermoduleUserManager;
    private notificationManager: IntermoduleNotificationManager;
    private leaderboard: Leaderboard;

    constructor(userManager: IntermoduleUserManager, notificationManager: IntermoduleNotificationManager, leaderboard: Leaderboard) {
        this.userManager = userManager;
        this.notificationManager = notificationManager;
        this.leaderboard = leaderboard;
    }

    public addUser(user: User): void {
        this.leaderboard.addUser(user);
    }

    public removeUser(user: User): void {
        this.leaderboard.removeUser(user);
    }

    //public notifyUser(user: User, notification: string): void {
    //    this.notificationManager.notifyUser(user, notification);
    //}
}