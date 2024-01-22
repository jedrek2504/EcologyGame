import express from 'express';
import UserManager from '../model/UserManager.js'
import { GameUser } from '../model/GameUser.js';
import { LeaderboardUser } from '../model/LeaderboardUser.js';
import { ForumUser } from '../model/ForumUser.js';
import { User } from '../model/User.js';
import UMM from '../exports/api.js';
import { NotificationManager } from '../model/NotificationManager.js';
import { UserNotification } from '../model/UserNotification.js';
import { send } from 'process';

const router = express.Router();

function sendWelcomeNotification(user:User) {
    let notification = new UserNotification();
    notification.setTitle("Hi!");
    notification.setMessage("Welcome to the EcologyGame");
    UMM.IntermoduleCommons.IntermoduleNotificationManager.notifyUser(user.getId(), notification).then(async()=>{
        console.log(`Sent welcome notification to ${await user.getUsername()}(#${user.getId()})`);
    }).catch(async (error:any)=>{
        console.log(`Failed to send welcome notification to ${await user.getUsername()}(#${user.getId()}): ${error}`);
    });
}

/**
 * @body_param auth
 * @body_param p256dh
 * @body_param endpoint
 */
router.post('/subscribe', (req: any, res: any, next: any) => {
    //get current user
    UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]).then(async (glfUser: GameUser|LeaderboardUser|ForumUser|null) => {
        if (glfUser) {
            let user:User = User.getInstance(glfUser.getId() as unknown as number);
            let auth = req.body.auth;
            let p256dh = req.body.p256dh;
            let endpoint = req.body.endpoint;
            let notificationManager:NotificationManager = UMM.IntermoduleCommons.IntermoduleNotificationManager as NotificationManager;
            notificationManager.registerUser(user, endpoint, p256dh, auth).then(()=>{
                res.send({success:true});
                sendWelcomeNotification(user);
            }).catch((error:any)=>{
                res.send({error: `Failed while trying to register user: ${error}`});
            });
        } else {
            res.send("IntermoduleUserManager::getUserBySessionKey returned falsy glfUser");
        }
    });
});

router.post('/unsubscribe', (req:any, res:any, next:any)=>{
    //get current user
    UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]).then(async (glfUser: GameUser|LeaderboardUser|ForumUser|null) => {
        if (glfUser) {
            let user:User = User.getInstance(glfUser.getId() as unknown as number);
            let notificationManager:NotificationManager = UMM.IntermoduleCommons.IntermoduleNotificationManager as NotificationManager;
            notificationManager.unregisterUser(user).then(()=>{
                res.send({success:true});
            }).catch((error:any)=>{
                res.send({error: `Failed while trying to unregister user: ${error}`});
            });
        } else {
            res.send("IntermoduleUserManager::getUserBySessionKey returned falsy glfUser");
        }
    });
});

export default {
    router: router
}