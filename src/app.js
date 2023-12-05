var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var expressLayouts = require('express-ejs-layouts'); 


var indexRouter = require('./routes/index');

//const ummAPI = require('./modules/user_management/routes/api.js');
const ummUsers = require('./modules/user_management/routes/users.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(expressLayouts);

app.engine('html', require('ejs').renderFile);
app.set("views", "./public");
app.set('view engine', 'ejs');

app.use("/umm/users", ummUsers.router);
//app.use(ummUsers.checkLogin);
app.use(ummUsers.loginGuard);

app.use('/', indexRouter);
//app.use("/umm/api", ummAPI.router);

module.exports = app;
