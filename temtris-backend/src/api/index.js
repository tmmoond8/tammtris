const apiRouter = require('express').Router();
const gamePlayRouter = require('./gamePlay');

apiRouter.get('/', (req, res) => { res.send('api')});
apiRouter.get('/gamePlay', (req, res) => {
  res.send('game play')
})

apiRouter.get('/gamePlay/test' , (req, res) => { 
  res.send('test');
})
apiRouter.get('/test', gamePlayRouter);
module.exports = apiRouter;