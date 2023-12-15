////var express = require('express');
import express from 'express';
////var path = require('path');
import path from 'path';
////var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
////var logger = require('morgan');
import logger from 'morgan';
////var cors = require('cors');
import cors from 'cors';
////var expressLayouts = require('express-ejs-layouts'); 
import expressLayouts from 'express-ejs-layouts';

import ejs from 'ejs';

//var indexRouter = require('./routes/index.cjs');
import indexRouter from './routes/index.js';
//const ummUsers = require('./modules/user_management/routes/users.cjs');
import ummUsers from './modules/user_management/routes/users.js';
//const ummAPI = require('./modules/user_management/routes/api.js');
//const ummUsers = require('./modules/user_management/routes/users.js');
//const ummUsers = import('/modules/user_management/routes/users.js');
//import ummUsers from './modules/user_management/routes/users.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(expressLayouts);

////app.engine('html', require('ejs').renderFile);
app.engine('html', ejs.renderFile);
app.set("views", "./public");
app.set('view engine', 'ejs');

app.use("/umm/users", ummUsers.router);
//app.use(ummUsers.checkLogin);
app.use(ummUsers.loginGuard);

app.use('/', indexRouter);
//app.use("/umm/api", ummAPI.router);

//module.exports = app;
export default app;