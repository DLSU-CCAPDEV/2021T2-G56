const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        res.send('hi lmao');
    },

    getDB: function(req, res) {

        db.findMany(User, {}, {}, {}, function(result) {
            res.send({result});
        });

    },

    getUser: function(req, res) {

        var username = req.params.username;

        db.findMany(User, { username:username }, {}, {}, function(result) {
            res.send( {result} );
        });


    },

}

module.exports = controller;
