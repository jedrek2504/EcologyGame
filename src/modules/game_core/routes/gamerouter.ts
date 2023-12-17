////var express = require('express');
import express from 'express';
import { GameUser } from '../../user_management/model/GameUser.js';
import { GameBoard } from '../model/GameBoard.js';
import {User} from '../model/User.js'
import UMM from '../../user_management/exports/api.js'
import { Challenge } from '../model/Challenge.js';
import { DailyTask } from '../model/DailyTask.js';
import { ChallengeStorage } from '../model/ChallengeStorage.js';


var router = express.Router();
let user: GameUser;
let userInstance : User;
let gameBoard : GameBoard;

router.get('/game',function(req : any, res : any, next : any) {
  res.render('game.html', { title: 'Express'});
});

router.get('/getScore',async function(req : any, res : any, next : any) {
  user = <GameUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
  gameBoard = new GameBoard(0,0);
  Promise.all([user.getScore(), user.getUsername()])
  .then(([score, username]) => {
    res.json({ score, username });
  })
  .catch((error) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
});

router.post('/game', function (req, res) {
  const toggleValue = req.body.toggleValue;
  const dailyTask = gameBoard.getTask(toggleValue);
  const test = dailyTask.getChallenges().map(challenge => challenge.getDescription());
  res.json({ test });
});
//module.exports = router;
export default router;
