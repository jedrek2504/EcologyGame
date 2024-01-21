import express from 'express';
import UserManager from '../model/UserManager.js'
import { GameUser } from '../model/GameUser.js';
import { LeaderboardUser } from '../model/LeaderboardUser.js';
import { ForumUser } from '../model/ForumUser.js';
import { User } from '../model/User.js';
import UMM from '../exports/api.js';

const router = express.Router();

router.get('/community', async (req: any, res: any, next: any) => {
    // Put all {user_id, photo} into an array at res.locals.users
    UMM.IntermoduleCommons.IntermoduleUserManager.getUsers((u:User)=>true).then(async(users : User[]) => {
        res.locals.users = await Promise.all(users.map(async (u) => {
            return {
                user_id: u.getId(),
                photo: await u.getPhoto()
            };
        }));


        /*res.locals.users = users.map(async (u) => {
            return {
                user_id: u.getId(),
                photo: await u.getPhoto()
            };
        });*/
        console.log("Users:");
        console.log(res.locals.users);
        res.render('community', { title: 'Community' });
    }).catch((error : any) => {
        console.log(`Error while fetching users: ${error}`);
        res.locals.error = `Error while fetching users: ${error}`;
        res.render('community', { title: 'Community' });
    });
});



export default {
    router: router
}