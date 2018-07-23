const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server);
const api = require('./api/index');
const io = require('./lib/socketServer')(socketIO);

app.use((req, res, next) => {
  res.io = io;
  next();
});
app.use('/api', api(app, '/api'));
app.listen('8080');