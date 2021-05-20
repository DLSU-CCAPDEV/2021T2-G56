const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        res.render('index');
    },

    getHome: function(req, res) {
        res.render('home');
    }

}

module.exports = controller;