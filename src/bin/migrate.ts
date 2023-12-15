//var db = require('../modules/user_management/database.js');
import db from '../modules/user_management/database.js';
db.sequelize.sync();