////var express = require('express');
import express from 'express';
import UMM from '../modules/user_management/exports/api.js'
import { GameUser } from '../modules/user_management/model/GameUser.js';
import { LeaderboardUser } from '../modules/user_management/model/LeaderboardUser.js';
import { ForumUser } from '../modules/user_management/model/ForumUser.js';
var router = express.Router();

/* GET home page. */
router.get('/', function(req : any, res : any, next : any) {
  console.log("INDEX ROUTER RENDER INDEX"); //
  UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]).then((user : GameUser|LeaderboardUser|ForumUser|null) => {
    if (user) {
      user.getUsername().then((username : string) => {
        res.locals.username = username;
        res.render('index', { title: 'Express' });

      }).catch((err)=>{
        res.locals.username = "User::getUsername() promise failed";
        res.render('index', { title: 'Express' });
      });
      //res.locals.score = user.getScore();
      //res.locals.is_forum_contributor = user.hasContributedToForum();
      
    }
    else {
      res.locals.username = "Null user detected";
      res.render('index', { title: 'Express' });
    }
  }).catch((err)=>{
    res.locals.username = "IntermoduleUserManager::getUserBySessionKey() promise failed"
    res.render('index', { title: 'Express' });
  });
});

/*router.get('/transfer-gui', function(req : any, res : any, next : any) {
  res.render('transfer-gui.html', { title: 'Express'});
});*/

router.get('/about', function(req : any, res : any, next : any) {
  console.log("INDEX ROUTER RENDER ABOUT"); //
  res.render('about.html', { title: 'Express' });
});

//module.exports = router;
export default router;
