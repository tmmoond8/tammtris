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
app.use('/', express.static(path.join(__dirname, 'front/build')))
app.use(express.static(path.join(__dirname, 'static')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
})
server.listen('14666');