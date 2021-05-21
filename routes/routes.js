const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const signupController = require(`../controllers/signupController.js`);
const debugController = require(`../controllers/debugController.js`);
const postController = require(`../controllers/postController.js`);
const commentController = require(`../controllers/commentController.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.post(`/checkExistence`, signupController.postCheckExistence);
app.post(`/createUser`, signupController.postCreateUser);
app.get('/post/:postid', controller.getPost);

app.post(`/createPost`, postController.createPost);
app.get('/edit/post/:postid', postController.editPostPage);
app.post('/editPostConfirm', postController.editPostConfirm);
app.post(`/deletePost`, postController.deletePost);
app.post(`/votePost`, postController.votePost);

app.post(`/createComment`, commentController.createComment);
app.get(`/edit/comment/:commentid`, commentController.editCommentPage);
app.post(`/editCommentConfirm`, commentController.editCommentConfirm);
app.post(`/deleteComment`, commentController.deleteComment);
app.post(`/voteComment`, commentController.voteComment);

app.get(`/debug/user/:username`, debugController.getTestUser);
app.get(`/debug/page`, debugController.getTestPage);
app.get(`/debug/all`, debugController.getAll);

module.exports = app;
