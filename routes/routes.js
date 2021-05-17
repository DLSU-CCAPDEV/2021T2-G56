const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const debugController = require(`../controllers/debugController.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);

app.get(`/debug/user/:username`, debugController.getTestUser);
app.get(`/debug/page`, debugController.getTestPage);
app.get(`/debug/all`, debugController.getAll);

module.exports = app;
