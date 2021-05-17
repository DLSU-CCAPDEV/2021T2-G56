const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const debugController = {

    getTest: function(req, res) {

        var username = 'Bingo';
        
        db.findOne(User, {username: username}, {},function(result) {
            res.send( {result} );
        });

    },

    getAll: function(req, res) {
        
        db.findMany(User, {}, {}, {}, function(result) {
            res.send( {result} );
        });

    }

}

module.exports = debugController;
