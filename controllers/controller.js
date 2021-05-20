const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const VotePost = require('../models/VotePostModel.js');

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
    }

}

module.exports = controller;