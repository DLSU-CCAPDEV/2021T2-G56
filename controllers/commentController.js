const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const VotePost = require('../models/VotePostModel.js');
const Comment = require('../models/CommentModel.js');
const VoteComment = require('../models/VoteCommentModel.js');

const commentController = {

    createComment: function(req, res) {
        db.findMany(Comment, {}, {}, { sort: {commentid: -1} }, function(result) {
            var entry = {
                commentid: result[0].commentid + 1,
                ownerid: req.session.userid,
                ownerusername: req.session.username,
                commentcaption: req.body.commentcaption,
                datecreated: Date.now(),
                datedited: 0,
                upvotecount: 0,
                postparent: req.body.postparent
            }

            db.insertOne(Comment, entry, function(flag){
                console.log(flag);
                res.send(entry);
            });
        });
    },

    deleteComment: function(req, res) {
        db.deleteOne(Comment, { commentid: req.body.commentid }, function(result) {
            db.deleteMany(VoteComment, { commentparent: req.body.commentid }, function(flag) {
                res.send(flag);
            });
        });
    },

    voteComment: function(req, res) {

        var query = {
            voteowner: req.session.username,         
            commentparent: req.body.commentparent,
        }
        db.findOne(VoteComment, query, {}, function(result) {
            if(result) {
                console.log('Updating comment vote');
                var entry = {
                    $set: {
                        votetype: req.body.votetype,
                        votedate: Date.now()
                    }
                }
                db.updateOne(VoteComment, query, entry, function(result) {
                    var entry = {
                        $set: {
                            upvotecount: req.body.upvotecount,
                        }
                    }
                    db.updateOne(Comment, {commentid: req.body.commentparent}, entry, function(result) {
                        console.log(result);
                    });
                });
            } else {
                console.log('Creating comment vote');
                db.findMany(VoteComment, {}, {}, { sort: {voteid: -1} }, function(result) {
                    var entry = {
                        voteid: result[0].voteid + 1,
                        voteowner: req.session.username,         
                        commentparent: req.body.commentparent,
                        votetype: req.body.votetype,
                        votedate: Date.now()
                    }
                    db.insertOne(VoteComment, entry, function(flag){
                        var entry = {
                            $set: {
                                upvotecount: req.body.upvotecount,
                            }
                        }
                        db.updateOne(Comment, {commentid: req.body.commentparent}, entry, function(result) {
                            console.log(result);
                            res.send(entry);
                        });
                    });
                });
            }
        });

    }
}

module.exports = commentController;