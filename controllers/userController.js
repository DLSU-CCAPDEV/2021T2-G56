const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const VotePost = require('../models/VotePostModel.js');
const Comment = require('../models/CommentModel.js');
const VoteComment = require('../models/VoteCommentModel.js');
const validator = require('../models/VoteCommentModel.js');

const userController = {

    updateSettings: function(req, res) {
        if(!req.body.username=='') {
            var entry = {
                $set: {
                    username: req.body.username
                }
            }
            db.updateOne(User, { userid: req.session.userid }, entry, function(result) {
                console.log('username update: ' + result);
            });
            db.updateMany(Post, { ownerid: req.session.userid }, {$set: {ownerusername: req.body.username}}, function(result) {
                console.log('2nd username update: ' + result);
            });
            db.updateMany(Comment, { ownerid: req.session.userid }, {$set: {ownerusername: req.body.username}}, function(result) {
                console.log('3rd username update: ' + result);
            });
            db.updateMany(VotePost, { voteowner: req.session.username }, {$set: {voteowner: req.body.username}}, function(result) {
                console.log('4th username update: ' + result);
            });
            db.updateMany(VoteComment, { voteowner: req.session.username }, {$set: {voteowner: req.body.username}}, function(result) {
                console.log('5th username update: ' + result);
            });
            req.session.username == req.body.username;
        }

        if(!req.body.email=='') {

            var entry = {
                $set: {
                    email: req.body.email
                }
            }
            db.updateOne(User, { userid: req.session.userid }, entry, function(result) {
                console.log('email update: ' + result);
            });

        }

        if(!req.body.password=='') {
            console.log('hatdog');
        }

        if(!req.body.bio=='') {

            var entry = {
                $set: {
                        bio: req.body.bio
                    }
                }
            db.updateOne(User, { userid: req.session.userid }, entry, function(result) {
                console.log('email update: ' + result);
            });
        }

        if(!req.body.profileimg=='') {
            var entry = {
                $set: {
                    profileimg: req.body.profileimg
                }
            }
            db.updateOne(User, { userid: req.session.userid }, entry, function(result) {
                console.log('profileimg update: ' + result);
            });
        }


    },

}

module.exports = userController;