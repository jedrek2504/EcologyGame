import { ForumMediator } from "../model/ForumMediator.js";
import { ForumModuleMediator } from "../model/ForumModuleMediator.js";
import { ForumUser } from "../model/ForumUser.js";
import { GameUser } from "../model/GameUser.js";
import { IntermoduleNotificationManager } from "../model/IntermoduleNotificationManager.js";
import { IntermoduleUserManager } from "../model/IntermoduleUserManager.js";
import { IntermoduleUserRelationshipManager } from "../model/IntermoduleUserRelationshipManager.js";
import { LeaderboardUser } from "../model/LeaderboardUser.js";
import { NotificationManager } from "../model/NotificationManager.js";
import { User } from "../model/User.js";
import { UserManager } from "../model/UserManager.js";
import { UserRelationshipManager } from "../model/UserRelationshipManager.js";


class IntermoduleCommons {
    private static _instance: IntermoduleCommons
    public static getInstance () : IntermoduleCommons {
      if (!this._instance) {
        this._instance = new IntermoduleCommons()
        IntermoduleCommons.IntermoduleUserManager = UserManager.getInstance();
        IntermoduleCommons.IntermoduleUserRelationshipManager = UserRelationshipManager.getInstance();
        IntermoduleCommons.IntermoduleNotificationManager = NotificationManager.getInstance();
      }
      return this._instance
    }

    public static IntermoduleUserManager : IntermoduleUserManager;
    public static IntermoduleUserRelationshipManager : IntermoduleUserRelationshipManager;
    public static IntermoduleNotificationManager : IntermoduleNotificationManager;
}

class UMM {
    private static _instance: UMM
    public static getInstance () : UMM {
      if (!this._instance) {
        this._instance = new UMM()
        UMM.IntermoduleCommons = IntermoduleCommons.getInstance();
        UMM.ForumMediator = ForumModuleMediator.getInstance();
      }
      return this._instance
    }

    public static IntermoduleCommons : IntermoduleCommons;
    public static ForumMediator : ForumMediator;

    public static LeaderboardUser() : LeaderboardUser {
        return User.getInstance();
    }
    public static GameUser() : GameUser {
        return User.getInstance();
    }
    public static ForumUser() : ForumUser {
        return User.getInstance();
    }
}

export default UMM.getInstance();