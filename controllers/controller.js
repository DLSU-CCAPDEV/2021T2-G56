const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const VotePost = require('../models/VotePostModel.js');
const Comment = require('../models/CommentModel.js');
const VoteComment = require('../models/VoteCommentModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        if(req.session.logged) {
            db.findMany(Post, {}, {}, {}, function(post) {
                db.findMany(VotePost, {voteowner: req.session.username}, {}, {}, function(votepost) {
                    var sess = req.session;
                    res.render('home', {post, sess, votepost} );
                });
            });
        } else {
            res.render('index');
        }
    },

    getPost: function(req, res) {
        if(req.session.logged) {
            db.findOne(Post, { postid: req.params.postid }, {}, function(post) {
                db.findMany(Comment, { postparent: req.params.postid }, {}, {}, function(comment) {
                    db.findOne(VotePost, { voteowner: req.session.username, postparent: req.params.postid }, {}, function(votepost) {
                        db.findMany(VoteComment, { voteowner: req.session.username }, {}, {}, function(votecomment) {
                            var sess = req.session;
                            res.render('post', {post, comment, votepost, votecomment, sess} );
                        });
                    });
                });
            });
        } else {
            res.render('index');
        }
    }

}

module.exports = controller;