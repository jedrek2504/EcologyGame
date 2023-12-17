////var express = require('express');
import express from 'express';
import { GameUser } from '../../user_management/model/GameUser.js';
//import {User} from '../model/User.js'


var router = express.Router();


router.get('/game', function(req : any, res : any, next : any) {
  
  res.render('game.html', { title: 'Express'});
});

router.get('/getScore', function(req : any, res : any, next : any) {
  const score = 42;
  res.json({score});
});
//module.exports = router;
export default router;
