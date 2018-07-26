const loginRouter = require('express').Router();
const userManager = require('../lib/userManager');

loginRouter.get('/join', (req, res) => { 
  const ueser = userManager.addGuest();
  console.dir(userManager.userList);
  res.send(ueser);
})

loginRouter.get('/clear', (req, res) => { 
  userManager.userList = [];
  res.send('clear')
})

module.exports = loginRouter;