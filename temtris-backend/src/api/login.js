const loginRouter = require('express').Router();
const userManager = require('../lib/userManager');
const socketClient = require('../lib/socketServer');

loginRouter.get('/join', (req, res) => { 
  userManager.addGuest();
  console.dir(userManager.userList);
  res.send('join')
})

loginRouter.get('/clear', (req, res) => { 
  userManager.userList = [];
  res.send('clear')
})

module.exports = loginRouter;