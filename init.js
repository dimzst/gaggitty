#!/usr/bin/env node

/**
 * Module dependencies.
 */

var expressApp = require('./expressapp');
var debug = require('debug')('gaggitty:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
expressApp.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(expressApp);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var electron = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;

electron.on('window-all-closed', function() {
  if(process.platform != 'darwin') {
    electron.quit();
  }
});

electron.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1280, height: 1024});
  mainWindow.loadUrl('http://localhost:' + port);
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
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

function onError(error) {
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
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
