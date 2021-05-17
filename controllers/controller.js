const db = require('../models/db.js');

const controller = {

    getFavicon: function(req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        res.render('index');
    },

    getUsername: function(req, res) {

        var query = {
            username: req.params.username
        };

        db.findOne('users', query, function (result) {
            res.send(result);
        });
    },

    getTest: function(req, res) {

        var content = req.query.content; 
        var yeet = {
            content: content
        }
        res.send(yeet);


    }
}

module.exports = controller;
