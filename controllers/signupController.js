const bcrypt = require('bcryptjs');
const saltRounds = 10;

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
        } else if (req.body.querytype == 'signup') {
            var entry = {
                username: req.body.username,
            }
            db.findOne(User, entry, {}, function(result) {
                if(result == null) {
                    entry = {
                        email: req.body.email
                    }
                    db.findOne(User, entry, {}, function(result) {
                        res.send(result);
                    });
                } else {
                    res.send(result);
                }
            });
        }
    },

    postCreateUser: function(req, res) {

        //create a new userid
        db.findMany(User, {}, {}, {}, function(result) {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            var entry = {
                userid: result.length + 1,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                datecreated: Date.now()
            }
            db.insertOne(User, entry, function(flag){
                // res.send(entry);
            });
        });

            
            
        });

    }

}

module.exports = signupController;
