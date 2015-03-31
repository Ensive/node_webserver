'use strict';

// include modules
var
  express = require('express');

// init the app
var
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

var subSocket = require('./lib/subscribe');
var badges = require('./models/badges');

// run the server
server.listen(3000, function () {
  console.log('Server is running on port %d', 3000);
});

/**
 * Server static assets out of public
 */
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile('./public/index.html');
});

io.sockets.on('connection', function (socket) {
  badges.get(function (err, data) {
    if (err) return;

    data.forEach(function (badge) {
      socket.emit('badge', badge);
    });

  });
});

subSocket.on('message', function (message) {
  io.sockets.emit('badge', message);
});
