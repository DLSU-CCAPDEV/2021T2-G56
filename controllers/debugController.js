const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const debugController = {

    getTestUser: function(req, res) {

        var username = req.params.username;
        
        db.findOne(User, {username: username}, {},function(result) {
            res.send( {result} );
        });

    },

    getTestPage: function(req, res) {
        res.render( 'test' );
    },

    getAll: function(req, res) {
        
        db.findMany(User, {}, {}, {}, function(result) {
            res.send( {result} );
        });

    }

}

module.exports = debugController;
