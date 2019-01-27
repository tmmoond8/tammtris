const apiRouter = require('express').Router();
const loginRouter = require('./login');

module.exports = (app, prefix) => {
  app.use(`${prefix}/login`, loginRouter);
  return apiRouter;
};