////var express = require('express');
import express from 'express';
import { GameUser } from '../../user_management/model/GameUser.js';
import { GameBoard } from '../model/GameBoard.js';
import {User} from '../model/User.js'
import UMM from '../../user_management/exports/api.js'


var router = express.Router();
let user: GameUser;
let userInstance : User;

router.get('/game',function(req : any, res : any, next : any) {
  res.render('game.html', { title: 'Express'});
});

router.get('/getScore',async function(req : any, res : any, next : any) {
  const gameBoard = new GameBoard(1, 1); 
  user = <GameUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
  /*const score = user.getScore();
  res.json({score});*/
  user.getScore().then((score) => {
    res.json({score});
  });
});
//module.exports = router;
export default router;
