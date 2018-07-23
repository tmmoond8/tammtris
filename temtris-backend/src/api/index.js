const apiRouter = require('express').Router();
const gamePlayRouter = require('./gamePlay');
const loginRouter = require('./login');

module.exports = (app, prefix) => {
  app.use(`${prefix}/gamePlay`, gamePlayRouter);
  app.use(`${prefix}/login`, loginRouter);
  return apiRouter;
};