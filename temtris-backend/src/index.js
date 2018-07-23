const express = require('express');
const app = express();
const api = require('./api/index');

app.use('/api', api);
app.listen('8080');