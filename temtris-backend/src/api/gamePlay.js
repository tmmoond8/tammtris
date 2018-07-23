const gamePlayRouter = require('express').Router();

gamePlayRouter.get('/test', (req, res) => { res.send('gamePlayRouter test')})

module.exports = gamePlayRouter;
