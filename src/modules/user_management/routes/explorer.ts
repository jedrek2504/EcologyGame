import express from 'express';
import UserManager from '../model/UserManager.js'
import { GameUser } from '../model/GameUser.js';
import { LeaderboardUser } from '../model/LeaderboardUser.js';
import { ForumUser } from '../model/ForumUser.js';
import { User } from '../model/User.js';
import UMM from '../exports/api.js';

const router = express.Router();

router.get('/community', async (req: any, res: any, next: any) => {
    res.render('community', { title: 'Community' });
});

export default {
    router: router
}