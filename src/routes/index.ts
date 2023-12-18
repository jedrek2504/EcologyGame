////var express = require('express');
import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req : any, res : any, next : any) {
  console.log("INDEX ROUTER RENDER INDEX"); //
  res.render('index.html', { title: 'Express' });
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
