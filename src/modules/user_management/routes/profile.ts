import express from 'express';
import UserManager from '../model/UserManager.js'
import { GameUser } from '../model/GameUser.js';
import { LeaderboardUser } from '../model/LeaderboardUser.js';
import { ForumUser } from '../model/ForumUser.js';
import { User } from '../model/User.js';
import UMM from '../exports/api.js';
import { Relationship } from '../model/Relationship.js';

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

function checkIsFriend(glfUser:GameUser|LeaderboardUser|ForumUser|null, targetUser : User) : Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (glfUser) {
            UMM.IntermoduleCommons.IntermoduleUserRelationshipManager.listUserRelationships(glfUser?.getId()).then((relationships : Relationship[] | null) => {
                if (relationships) {
                    let relationship : Relationship|undefined = relationships.find((r : Relationship) => {
                        return r.firstUser.getId() == targetUser.getId() || r.secondUser.getId() == targetUser.getId();
                    });
                    if (relationship) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
                else {
                    reject("Falsy relationships array encountered!");
                }
            }).catch((err : any) => {
                reject(`Error while listing user relationships: ${err}`);
            });
        }
        else {
            reject("Current user null or undefined");
        }
    });
}

function checkIsFriendErrCb(glfUser:GameUser|LeaderboardUser|ForumUser|null, targetUser : User, errCb : (isFriend : boolean) => void) : Promise<boolean> {
    return new Promise((resolve, reject) => {
        checkIsFriend(glfUser, targetUser).then((isFriend : boolean) => {
            resolve(isFriend);
        }).catch((err : any) => {
            errCb(err);
        });
    });
}

function getFriendsData(user:User) : Promise<{user_id : String, username : string, photo : string}[]> {
    return new Promise((resolve, reject) => {
        UMM.IntermoduleCommons.IntermoduleUserRelationshipManager.listUserRelationships(user.getId()).then(async(relationships : Relationship[] | null) => {
            if (relationships) {
                /*let friends : {user_id : String, username : string, photo : string}[] = [];
                relationships.forEach((r : Relationship) => {
                    let friend : User = r.firstUser.getId() == user.getId() ? r.secondUser : r.firstUser;
                    friends.push({
                        user_id: friend.getId(),
                        username: await friend.getUsername(),
                        photo: await friend.getPhoto()
                    });
                });*/
                let friends = await Promise.all(relationships.map(async (r : Relationship) => {
                    let friend : User = r.firstUser.getId() == user.getId() ? r.secondUser : r.firstUser;
                    return {
                        user_id: friend.getId(),
                        username: await friend.getUsername(),
                        photo: await friend.getPhoto()
                    };
                }));
                resolve(friends);
            }
            else {
                reject("Falsy relationships array encountered!");
            }
        }).catch((err : any) => {
            reject(`Error while listing user relationships: ${err}`);
        });
    });
}

function getFriendsDataErrCb(user:User, errCb : (err : any) => void) : Promise<{user_id : String, username : string, photo : string}[]> {
    return new Promise((resolve, reject) => {
        getFriendsData(user).then((friends : {user_id : String, username : string, photo : string}[]) => {
            resolve(friends);
        }).catch((err : any) => {
            errCb(err);
            reject(err);
        });
    });
}


/**
 * Get profile of a user by id
 */
router.get('/profile/:id', async (req: any, res: any, next: any) => {
    res.locals.profile_id = req.params.id;
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

        let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
        //Check if current user is the same as the profile user
        res.locals.is_current_user = false;
        if (glfUser && (glfUser.getId() == user.getId())) {
            res.locals.is_current_user = true;
        }
        //Check if current user is friends with the profile user
        /*res.locals.is_friend = false;
        if (glfUser) {
            UMM.IntermoduleCommons.IntermoduleUserRelationshipManager.listUserRelationships(glfUser?.getId()).then((relationships : Relationship[] | null) => {
                if (relationships) {
                    let relationship : Relationship|undefined = relationships.find((r : Relationship) => {
                        return r.firstUser.getId() == user.getId() || r.secondUser.getId() == user.getId();
                    });
                    if (relationship) {
                        res.locals.is_friend = true;
                    }
                }
            }).catch((err : any) => {
                console.log(`Error while listing user relationships: ${err}`);
            });
        }*/
        res.locals.is_friend = false;
        res.locals.is_friend = await checkIsFriendErrCb(glfUser, user, (err: any) => {
            console.log(`Error while checking if user is friend: ${err}`);
            res.locals.is_friend = false;
        });

        // Put all {user_id, username, photo} into an array at res.locals.friends
        res.locals.friends = await getFriendsDataErrCb(user, (err : any) => {
            console.log(`Error while fetching friends: ${err}`);
            res.locals.friends = [];
        });
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

/**
 * @body_param friend_id
 */
router.post('/friend', async (req: any, res: any, next: any) => {
    let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
    let user : User = User.getInstance(glfUser?.getId() as unknown as Number);
    if (user) {
        UMM.IntermoduleCommons.IntermoduleUserRelationshipManager.createRelationship(user, User.getInstance(req.body.friend_id)).then(() => {
            res.status(200).send({ success: `Friend added successfully` });
        }).catch((err)=>{
            console.log(`ERRORRRRRRRRR: ${err}`);
            res.status(500).send({ error: `Error while adding friend: ${err}` });
        });
    }
    else {
        res.status(500).send({ error: `Error while reading user object` });
    }
});

/**
 * body_param friend_id
 */
router.post('/unfriend', async (req: any, res: any, next: any) => {
    let glfUser : GameUser|LeaderboardUser|ForumUser|null = await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
    let user : User = User.getInstance(glfUser?.getId() as unknown as Number);
    if (user) {
        //Find relationship
        UMM.IntermoduleCommons.IntermoduleUserRelationshipManager.listUserRelationships(user.getId()).then((relationships : Relationship[] | null) => {
            if (relationships) {
                let relationship : Relationship|undefined = relationships.find((r : Relationship) => {
                    return r.firstUser.getId() == req.body.friend_id || r.secondUser.getId() == req.body.friend_id;
                });
                if (relationship) {
                    UMM.IntermoduleCommons.IntermoduleUserRelationshipManager.deleteRelationship(relationship).then(()=>{
                        res.status(200).send({ success: `Friend removed successfully` });
                    }).catch((err)=>{
                        res.status(500).send({ error: `Error while removing friend: ${err}` });
                    });
                }
                else {
                    res.status(500).send({ error: `Error while removing friend. Relationship not found!` });
                }
            }
            else {
                res.status(500).send({ error: `Falsy relationships array encountered!` });    
            }
        }).catch((err : any) => {
            res.status(500).send({ error: `Error while listing user relationships: ${err}` });    
        });

        /*if (relationship) {
            if (UMM.IntermoduleCommons.IntermoduleUserRelationshipManager.deleteRelationship(relationship)) {
                res.status(200).send({ success: `Friend removed successfully` });
            }
            else {
                res.status(500).send({ error: `Failed to remove relationship!` });
            }
        }
        else {
            res.status(500).send({ error: `Error while removing friend. Null relationship encountered!` });
        }*/
    }
    else {
        res.status(500).send({ error: `Error while reading user object` })
    }
});

export default {
    router: router
}