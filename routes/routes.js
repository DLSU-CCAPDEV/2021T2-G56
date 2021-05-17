const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.get(`/getDB`, controller.getDB);
app.get(`/getUser/:username`, controller.getUser);

module.exports = app;
