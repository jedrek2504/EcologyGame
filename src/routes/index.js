var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

router.get('/transfer-gui', function(req,res, next) {
  res.render('transfer-gui.html', { title: 'Express'});
});

module.exports = router;
