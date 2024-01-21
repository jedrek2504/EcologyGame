import express from 'express';
import UserManager from '../model/UserManager.js'
import { GameUser } from '../model/GameUser.js';
import { LeaderboardUser } from '../model/LeaderboardUser.js';
import { ForumUser } from '../model/ForumUser.js';
import { User } from '../model/User.js';
import UMM from '../exports/api.js';

const router = express.Router();

/*function reference(value : any) {
    return {value : value};
}

function setOrFail(refObj : {value : any}, value : any, name : string) {
    if (value) {
        refObj.value = value;
    }
    else {
        refObj.value = `Failed to fetch ${name}`;
    }
}*/

function setOrFail(value : any, name : string, cb : (value : any) => void) {
    if (value === null || value === undefined) {
        value = `Failed to fetch ${name}`;
    }
    cb(value);
}

/**
 * @TODO Change so that it is accepts user_id as param (or /profile/:id)
 */
router.get('/profile', async (req: any, res: any, next: any) => {
    //let user : GameUser|LeaderboardUser|ForumUser|null = await UserManager.getUserBySessionKey(req.cookies['login_id']);
    //let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UserManager.getUserBySessionKey(req.cookies['login_id']);
    let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
    let user : User = User.getInstance(glfUser?.getId() as unknown as Number);

    if (user) {
        /*res.locals.username = await user.getUsername(); 
        if (!res.locals.username) {
            res.locals.username = "Failed to fetch username";
        }*/

        res.locals.username="";
        res.locals.score=0;
        res.locals.email="";
        res.locals.is_forum_contributor=false;
        /*setOrFail(reference(res.locals.username), await user.getUsername(), "username");
        setOrFail(reference(res.locals.score), await user.getScore(), "score");
        setOrFail(reference(res.locals.email), await user.getEmail(), "email");
        setOrFail(reference(res.locals.is_forum_contributor), await user.hasContributedToForum(), "is_forum_contributor");*/
        setOrFail(await user.getUsername(), "username", (value : any) => res.locals.username = value);
        setOrFail(await user.getScore(), "score", (value : any) => res.locals.score = value);
        setOrFail(await user.getEmail(), "email", (value : any) => res.locals.email = value);
        setOrFail(await user.hasContributedToForum(), "is_forum_contributor", (value : any) => res.locals.is_forum_contributor = value);
    }
    
    res.render('profile', { title: 'Profile' });
    
});

router.post('/setemail', async (req: any, res: any, next: any) => {
    let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
    let user : User = User.getInstance(glfUser?.getId() as unknown as Number);
    if (user) {
        user.setEmail(req.body.email).then(()=>{
            res.status(200).send({ success: `Email set successfully` });
        }).catch((err)=>{
            res.status(500).send({ error: `Error while setting email: ${err}` });
        });
        
    }
    else {
        res.status(500).send({ error: `Error while reading user object` })
    }
});

export default {
    router: router
}