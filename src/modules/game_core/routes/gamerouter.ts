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
  const score = user.getId();
  const username = user.getId();
  //userInstance = new User(user);
  gameBoard = new GameBoard(0,0);

  res.json({score,username});
});

router.post('/game', function (req, res) {
  const toggleValue = req.body.toggleValue;
  /*const dailyTask = gameBoard.getTask(toggleValue);
  const challenges = dailyTask.getChallenges();
  const chalengedesc = challenges.map(challenge => challenge.getDescription());*/
  const dailyTask = new GameBoard(0,0)
  const test = dailyTask.getTask(toggleValue).getChallenges().map(challenge => challenge.getDescription());
  res.json({ test });
});
//module.exports = router;
export default router;
