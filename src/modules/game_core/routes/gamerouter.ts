////var express = require('express');
import express from 'express';
var router = express.Router();

router.get('/game', function(req : any, res : any, next : any) {
  console.log("reached game router"); //
  res.render('game.html', { title: 'Express' });
});


//module.exports = router;
export default router;
