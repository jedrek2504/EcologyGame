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
    /*let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
    let user : User = User.getInstance(glfUser?.getId() as unknown as Number);

    if (user) {
        res.locals.username="";
        res.locals.score=0;
        res.locals.email="";
        res.locals.is_forum_contributor=false;
        setOrFail(await user.getUsername(), "username", (value : any) => res.locals.username = value);
        setOrFail(await user.getScore(), "score", (value : any) => res.locals.score = value);
        setOrFail(await user.getEmail(), "email", (value : any) => res.locals.email = value);
        setOrFail(await user.hasContributedToForum(), "is_forum_contributor", (value : any) => res.locals.is_forum_contributor = value);
    }
    
    res.render('profile', { title: 'Profile' });*/


    UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]).then((user : GameUser|LeaderboardUser|ForumUser|null) => {
        if (user) {
            res.redirect(`/umm/users/profile/${user.getId()}`);
        }
        else {
            console.info("Current user null or undefined")
            //sign out
            res.redirect('/umm/users/logout');
        }
    }).catch((err)=>{
        console.log("IntermoduleUserManager::getUserBySessionKey() promise failed, error: " + err);
    });
});

/**
 * 
 */
router.get('/profile/:id', async (req: any, res: any, next: any) => {
    let user : User = User.getInstance(req.params.id);
    if (user) {
        res.locals.username="";
        res.locals.score=0;
        res.locals.email="";
        res.locals.photo="";
        res.locals.is_forum_contributor=false;
        setOrFail(await user.getUsername(), "username", (value : any) => res.locals.username = value);
        setOrFail(await user.getScore(), "score", (value : any) => res.locals.score = value);
        setOrFail(await user.getEmail(), "email", (value : any) => res.locals.email = value);
        setOrFail(await user.getPhoto(), "photo", (value : any) => res.locals.photo = value);
        setOrFail(await user.hasContributedToForum(), "is_forum_contributor", (value : any) => res.locals.is_forum_contributor = value);

        //Check if current user is the same as the profile user
        let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
        res.locals.is_current_user = false;
        if (glfUser && (glfUser.getId() == user.getId())) {
            res.locals.is_current_user = true;
        }
    }
    else {
        res.locals.username = "Null or undefined user detected";
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

router.post('/setusername', async (req: any, res: any, next: any) => {
    let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
    let user : User = User.getInstance(glfUser?.getId() as unknown as Number);
    if (user) {
        user.setUsername(req.body.username).then(()=>{
            res.status(200).send({ success: `Username set successfully` });
        }).catch((err : any)=>{
            res.status(500).send({ error: `Error while setting username: ${err}` });
        });
        
    }
    else {
        res.status(500).send({ error: `Error while reading user object` })
    }
});

router.post('/setpassword', async (req: any, res: any, next: any) => {
    let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
    let user : User = User.getInstance(glfUser?.getId() as unknown as Number);
    if (user) {
        user.setPassword(req.body.password).then(()=>{
            res.status(200).send({ success: `Password set successfully` });
        }).catch((err : any)=>{
            res.status(500).send({ error: `Error while setting password: ${err}` });
        });
        
    }
    else {
        res.status(500).send({ error: `Error while reading user object` })
    }
});

router.post('/setphoto', async (req: any, res: any, next: any) => {
    let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
    let user : User = User.getInstance(glfUser?.getId() as unknown as Number);
    if (user) {
        user.setPhoto(req.body.photo).then(()=>{
            res.status(200).send({ success: `Photo set successfully` });
        }).catch((err : any)=>{
            res.status(500).send({ error: `Error while setting photo: ${err}` });
        });
        
    }
    else {
        res.status(500).send({ error: `Error while reading user object` })
    }
});

export default {
    router: router
}