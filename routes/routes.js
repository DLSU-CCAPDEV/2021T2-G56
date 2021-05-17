const express           = require('express');
const app               = express();

const controller = require('../controllers/controller.js')

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/user/:username', controller.getUsername);

app.get('/test', controller.getTest);

module.exports = app;
