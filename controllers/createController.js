const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

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

            db.insertOne(Post, entry, function(flag){
                res.send(entry);
            });
        });

        
    }

}

module.exports = createController;