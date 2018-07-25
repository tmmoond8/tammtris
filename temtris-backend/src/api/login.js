const loginRouter = require('express').Router();
const userManager = require('../lib/userManager');

loginRouter.get('/clear', (req, res) => { 
  userManager.userList = [];
  res.send('clear')
})

module.exports = loginRouter;