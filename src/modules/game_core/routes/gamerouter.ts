////var express = require('express');
import express from 'express';
import { GameUser } from '../../user_management/model/GameUser.js';
import { GameBoard } from '../model/GameBoard.js';
import { User } from '../model/User.js'
import UMM from '../../user_management/exports/api.js'
import { Challenge } from '../model/Challenge.js';
import { DailyTask } from '../model/DailyTask.js';
import { ChallengeStorage } from '../model/ChallengeStorage.js';
import { UserNotification } from '../../user_management/model/UserNotification.js';


var router = express.Router();
let user: GameUser;
let userInstance: User;
let gameBoard: GameBoard;
let challengeStorage: ChallengeStorage;
let previousSessionKey: string | null = null;

function notifyUserAsReward(gameUser: GameUser) {
  let notification = new UserNotification();
  notification.setTitle("Wow!");
  notification.setMessage("Congratulations! You have reached 100 points!");
  UMM.IntermoduleCommons.IntermoduleNotificationManager.notifyUser(gameUser.getId(), notification).then(async()=>{
        console.log(`Sent congratulations to ${await gameUser.getUsername()}(#${gameUser.getId()})`);
  }).catch(async (error:any)=>{
        console.log(`Failed to send congratulations to ${await gameUser.getUsername()}(#${gameUser.getId()}): ${error}`);
  });
}

router.get('/game', function (req: any, res: any, next: any) {
  res.render('game.html', { title: 'Express' });
});

function hasSessionKeyChanged(currentSessionKey: string): boolean {
  if (!previousSessionKey) {
    return false;
  }
  return currentSessionKey !== previousSessionKey;
}

router.get('/getScore', async function (req: any, res: any, next: any) {
  const currentSessionKey = req.cookies["login_id"];

  const sessionKeyChanged = hasSessionKeyChanged(currentSessionKey);

  user = <GameUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
  challengeStorage = new ChallengeStorage();
  await challengeStorage.initialize();

  if (!gameBoard || currentSessionKey) {
    gameBoard = new GameBoard(0, 0, challengeStorage);
  }


  try {
    const [score, username] = await Promise.all([user.getScore(), user.getUsername()]);
    const roundedScore = score.valueOf();
    const numberOfDone = roundedScore / 20;
    if(Math.ceil(numberOfDone)!= 0){
      for(let i = 0; i < numberOfDone; i++){
        gameBoard.getTask(i).markAsCompleted();
      }
    }
    res.json({ roundedScore, username });
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
    const dailyTask = gameBoard.getTask(toggleValue - 1);
    const isCompleted = dailyTask.checkIsCompleted();
    const challenges = dailyTask.getChallenges();
    const desc = challenges.map(challenge => challenge.getDescription());
    const data = {
      isCompleted: isCompleted,
      desc: desc
    }

    res.send(data);
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/game', async function (req, res) {
  try {
    // Access data from the request body
    const dayNumber = req.body.dayNumber;

    if (!gameBoard) {
      gameBoard = new GameBoard(0, 0, challengeStorage);
    }
    const dailyTask = gameBoard.getTask(dayNumber -1);
    dailyTask.markAsCompleted();
    const [score] = await Promise.all([user.getScore()]);
    if(score.valueOf() < 100){
      await user.setScore(score.valueOf() + 20);
    }
    const [newScore] = await Promise.all([user.getScore()]);
    const roundedScore = newScore;

    res.json({roundedScore});
  } catch (error) {
    // Handle errors
    console.error('Error processing PUT request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/reset', async function (req: any, res: any, next: any) {
  try {
    await user.setScore(0);
    const [score, username] = await Promise.all([user.getScore(), user.getUsername()]);
    const roundedScore = score.toFixed(2);
    for(let i =0;i< 5;i++){
      gameBoard.getTask(i).reset();
    }
    res.json({ roundedScore, username });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * @brief Check if user has 100 points and if so, send a notification to the user
 */
router.post('/checkout', async function (req: any, res: any, next: any) {
  console.log("CHECKOUT");
  // get user by session key
  user = <GameUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
  try {
    const [score] = await Promise.all([user.getScore()]);
    if (score.valueOf() >= 100) {
      notifyUserAsReward(user);
    }
    res.json({ score });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
