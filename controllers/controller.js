const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        if(req.session.logged) {
            db.findMany(Post, {}, {}, {}, function(result) {
                res.render('home', {result} );
            });
        } else {
            res.render('index');
        }
    }

}

module.exports = controller;