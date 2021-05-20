const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        if(req.session.logged) {
            res.render('home');
        } else {
            res.render('index');
        }
    },

    getHome: function(req, res) {
        if(req.session.logged) {
            res.render('home');
        } else {
            res.render('index');
        }
        
    }

}

module.exports = controller;