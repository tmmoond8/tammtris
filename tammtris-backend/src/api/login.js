const loginRouter = require('express').Router();
const userManager = require('../lib/userManager');

loginRouter.get('/join', (req, res) => { 
  const ueser = userManager.addGuest();
  console.dir(userManager.getUserList());
  res.send(ueser);
})

module.exports = loginRouter;