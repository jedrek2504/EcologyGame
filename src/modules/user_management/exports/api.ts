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
        this._instance = new IntermoduleCommons(UserManager.getInstance(), UserRelationshipManager.getInstance(), NotificationManager.getInstance())
      }
      return this._instance
    }

    private constructor(IntermoduleUserManager : IntermoduleUserManager, IntermoduleUserRelationshipManager : IntermoduleUserRelationshipManager, IntermoduleNotificationManager : IntermoduleNotificationManager) {
        this.IntermoduleUserManager = IntermoduleUserManager;
        this.IntermoduleUserRelationshipManager = IntermoduleUserRelationshipManager;
        this.IntermoduleNotificationManager = IntermoduleNotificationManager;
    }

    public IntermoduleUserManager : IntermoduleUserManager;
    public IntermoduleUserRelationshipManager : IntermoduleUserRelationshipManager;
    public IntermoduleNotificationManager : IntermoduleNotificationManager;
}

class UMM {
    private static _instance: UMM
    public static getInstance () : UMM {
      if (!this._instance) {
        this._instance = new UMM(IntermoduleCommons.getInstance(), ForumModuleMediator.getInstance())
      }
      return this._instance
    }

    private constructor(IntermoduleCommons : IntermoduleCommons, ForumMediator : ForumMediator) {
        this.IntermoduleCommons = IntermoduleCommons
        this.ForumMediator = ForumMediator
    }

    public IntermoduleCommons : IntermoduleCommons;
    public ForumMediator : ForumMediator;

    public LeaderboardUser() : LeaderboardUser {
        return User.getInstance();
    }
    public GameUser() : GameUser {
        return User.getInstance();
    }
    public ForumUser() : ForumUser {
        return User.getInstance();
    }
}

export default UMM.getInstance();