const session = require('express-session');
const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const debugController = {

    getTestUser: function(req, res) {
        var username = req.params.username;
        var testmessage = req.session.testmessage;

        console.log(testmessage);
        
        db.findOne(User, {username: username}, {},function(result) {
            res.send( {result} );
        });

    },

    getTestPage: function(req, res) {

        var session = req.session;

        res.render( 'test', session );
    },

    getAll: function(req, res) {
        var testmessage = req.session.testmessage;
        console.log( testmessage );
        
        db.findMany(User, {}, {}, {}, function(result) {
            console.log(result.length);
            res.send( {result} );
        });

    }

}

module.exports = debugController;
