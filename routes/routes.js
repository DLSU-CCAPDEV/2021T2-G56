const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const signupController = require(`../controllers/signupController.js`);
const debugController = require(`../controllers/debugController.js`);
const createController = require(`../controllers/createController.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.post(`/checkExistence`, signupController.postCheckExistence);
app.post(`/createUser`, signupController.postCreateUser);

app.post(`/createPost`, createController.createPost);
app.get('/edit/post/:postid', createController.editPostPage);
app.post('/editPostConfirm', createController.editPostConfirm);
app.post(`/votePost`, createController.votePost);
app.post(`/deletePost`, createController.deletePost);

app.get(`/debug/user/:username`, debugController.getTestUser);
app.get(`/debug/page`, debugController.getTestPage);
app.get(`/debug/all`, debugController.getAll);

module.exports = app;
