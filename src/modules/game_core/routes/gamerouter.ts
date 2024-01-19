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
let challengeStorage : ChallengeStorage;

router.get('/game', function (req: any, res: any, next: any) {
  res.render('game.html', { title: 'Express' });
});

router.get('/getScore', async function (req: any, res: any, next: any) {
  user = <GameUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
  challengeStorage = new ChallengeStorage();
  await challengeStorage.initialize();

  if (!gameBoard) {
    // Initialize gameBoard only if it's null
    gameBoard = new GameBoard(0, 0, challengeStorage);
  }

  try {
    const [score, username] = await Promise.all([user.getScore(), user.getUsername()]);

    ///<for integration-1 demonstration>
    await user.setScore(score.valueOf() + 1);
    ///</for integration-1 demonstration>

    res.json({ score, username });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/game', async function (req, res) {
  try {
    const toggleValue = req.body.toggleValue;

    if (!gameBoard) {
      gameBoard = new GameBoard(0, 0, challengeStorage);
    }

    const dailyTask = gameBoard.getTask(toggleValue -1);
    const desc = dailyTask.getChallenges().map(challenge => challenge.getDescription());
    res.send({ desc });
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
