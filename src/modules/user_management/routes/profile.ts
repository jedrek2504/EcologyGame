import express from 'express';
import UserManager from '../model/UserManager.js'
import { GameUser } from '../model/GameUser.js';
import { LeaderboardUser } from '../model/LeaderboardUser.js';
import { ForumUser } from '../model/ForumUser.js';
const router = express.Router();


router.get('/profile', async (req: any, res: any, next: any) => {
    let user : GameUser|LeaderboardUser|ForumUser|null = await UserManager.getUserBySessionKey(req.cookies['login_id']);
    res.locals.username = await user?.getUsername(); 
    if (!res.locals.username) {
        res.locals.username = "Failed to fetch username";
    }
    res.render('profile', { title: 'Profile' });
    
});

export default {
    router: router
}