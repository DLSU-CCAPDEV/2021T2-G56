const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const VotePost = require('../models/VotePostModel.js');

const createController = {

    createPost: function(req, res) {
        
        db.findMany(Post, {}, {}, { sort: {postid: -1} }, function(result) {
            var entry = {
                postid: result[0].postid + 1,
                ownerid: req.session.userid,
                ownerusername: req.session.username,
                postcaption: req.body.caption,
                postlocation: 'Agno, Taft Ave.',
                imgurl: req.body.imgurl,
                datecreated: Date.now(),
                upvotecount: 0,
                profileimg: req.session.profileimg
            }

            console.log(entry);

            db.insertOne(Post, entry, function(flag){
                console.log(flag);
                res.send(entry);
            });
        });  
    },

    editPostPage: function(req, res) {
        db.findOne(Post, {postid: req.params.postid}, {}, function(post) {
            var sess = req.session;
            res.render('editPostPage', {sess, post} );
        });  
    },

    editPostConfirm: function(req, res) {

        var entry = {
            $set: {
                postcaption: req.body.postcaption,
                dateedited: Date.now()
            }
        }

        db.updateOne(Post, { postid: req.body.postid }, entry, function(result) {
            console.log(result);
        });

    },

    deletePost: function(req, res) {
        db.deleteOne(Post, { postid: req.body.postid }, function(result) {
            db.deleteMany(VotePost, { postparent: req.body.postid }, function(flag) {
                res.send(flag);
            });
        });
    },

    votePost: function(req, res) {

        var query = {
            voteowner: req.session.username,         
            postparent: req.body.postparent,
        }

        db.findOne(VotePost, query, {}, function(result) {
            if(result) {
                console.log('Updating vote');
                var entry = {
                    $set: {
                        votetype: req.body.votetype,
                        votedate: Date.now()
                    }
                }
                db.updateOne(VotePost, query, entry, function(result) {
                    var entry = {
                        $set: {
                            upvotecount: req.body.upvotecount,
                        }
                    }
                    db.updateOne(Post, {postid: req.body.postparent}, entry, function(result) {
                        console.log(result);
                    });
                });
            } else {
                console.log('Creating vote');
                db.findMany(VotePost, {}, {}, { sort: {voteid: -1} }, function(result) {
                    var entry = {
                        voteid: result[0].voteid + 1,
                        voteowner: req.session.username,         
                        postparent: req.body.postparent,
                        votetype: req.body.votetype,
                        votedate: Date.now()
                    }
                    db.insertOne(VotePost, entry, function(flag){
                        var entry = {
                            $set: {
                                upvotecount: req.body.upvotecount,
                            }
                        }
                        db.updateOne(Post, {postid: req.body.postparent}, entry, function(result) {
                            console.log(result);
                            res.send(entry);
                        });
                    });

                });
            }
        });

    }
}

module.exports = createController;