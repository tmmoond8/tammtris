const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server);
const api = require('./api/index');
const io = require('./lib/socketServer')(socketIO);
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
  res.io = io;
  next();
});
app.use('/api', api(app, '/api'));
app.use(express.static(path.join(__dirname, 'static')))
server.listen('14666');