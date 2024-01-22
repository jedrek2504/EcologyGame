#!/usr/bin/env node

/**
 * Module dependencies.
 */

//require('dotenv').config({ path: `${__dirname}/../../.env` }); 
////const path = require('path')
import path from 'path'
////require('dotenv').config({ path: path.resolve(__dirname, './.env') })
import dotenv from 'dotenv'


/*import { fileURLToPath } from 'url';//
import { dirname } from 'path';//
const __filename = fileURLToPath(import.meta.url);//
const __dirname = dirname(__filename);//
dotenv.config({ path: path.resolve(__dirname, './.env') })*/
//dotenv.config({ path: path.resolve(path.dirname(process.argv[1]), './.env') });

dotenv.config({ path: path.resolve(path.dirname(new URL(import.meta.url).pathname), './.env') });
/*(async () => {
  try {
    await dotenv.config({ path: path.resolve(path.dirname(new URL(import.meta.url).pathname), './.env') });
  } catch (error) {
    console.error('Error loading dotenv:', error);
  }
})();*/

////var app = require('../app.js');
import app from '../app.js'
////var debug = require('debug')('src:server');
import debug from 'debug'
debug('src:server')
////var http = require('http');
//import http from 'http'
import https from 'https'

import fs from 'fs'


/**
 * Get port from environment and store in Express.
 */

if(process.env.PORT){
    console.log(`Application: process.env.port is ${process.env.PORT}`);
}
else {
    console.log("Application: process.env.PORT is UNSET");
}
var port = normalizePort(process.env.PORT || '80');
app.set('port', port);
console.log(`APP.GET port=${app.get('port')}`);

/**
 * Create HTTP server.
 */

//var server = http.createServer(app);
var privateKey = fs.readFileSync('/ecopers/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/ecopers/cert.pem', 'utf8');


var server = https.createServer({
  key: privateKey,
  cert: certificate
}, app);
//var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val : any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error : any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  if (addr) {
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
  }
  //console.log('Null address!');
}
