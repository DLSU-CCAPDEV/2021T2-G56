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

    getPage: function(req, res) {
        if(req.session.logged) {
            if(req.params.pagetype == 'popular') {
                db.findMany(Post, {}, {}, { sort: {upvotecount: -1} }, function(post) {
                    db.findMany(VotePost, {voteowner: req.session.username}, {}, {}, function(votepost) {
                        var sess = req.session;
                        var page = {
                            type: 'p o p u l a r'
                        }
                        res.render('page', {post, sess, votepost, page} );
                    });
                });
            } else if(req.params.pagetype == 'trending') {
                db.findMany(Post, {}, {}, { sort: {datecreated: -1, upvotecount: -1} }, function(post) {
                    db.findMany(VotePost, {voteowner: req.session.username}, {}, {}, function(votepost) {
                        var sess = req.session;
                        var page = {
                            type: 't r e n d i n g'
                        }
                        res.render('page', {post, sess, votepost, page} );
                    });
                });
            } else if(req.params.pagetype == 'new') {
                db.findMany(Post, {}, {}, { sort: {datecreated: -1} }, function(post) {
                    db.findMany(VotePost, {voteowner: req.session.username}, {}, {}, function(votepost) {
                        var sess = req.session;
                        var page = {
                            type: 'n e w'
                        }
                        res.render('page', {post, sess, votepost, page} );
                    });
                });
            } else {
                db.findMany(Post, {}, {}, {}, function(post) {
                    db.findMany(VotePost, {voteowner: req.session.username}, {}, {}, function(votepost) {
                        var sess = req.session;
                        res.render('home', {post, sess, votepost} );
                    });
                });
            }
        } else {
            res.render('index');
        }
    },

    getSettings: function(req, res) {
        if(req.session.logged) {
            db.findOne(User, {username: req.session.username}, {}, function(user) {
                var sess = req.session;
                res.render('settings', {sess, user} );
            });
        } else {
            res.render('index');
        }
    },

    getUser: function(req, res) {
        if(req.session.logged) {
            db.findOne(User, { username: req.params.username }, {}, function(user) {
                db.findMany(Post, { ownerusername: req.params.username }, {}, {}, function(post) {
                    var sess = req.session;
                    res.render('user', {user, post, sess} );
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