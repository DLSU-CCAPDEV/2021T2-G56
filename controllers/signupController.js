const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    postCheckExistence: function(req, res) {
        if(req.body.querytype == 'login') {
            var entry = {
                email: req.body.email,
                password: req.body.password
            }
            db.findOne(User, entry, {}, function(result) {
                res.send( result );
            });
        } else {

        }
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

module.exports = signupController;
