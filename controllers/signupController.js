const bcrypt = require('bcryptjs');
const saltRounds = 10;

const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    postCheckExistence: function(req, res) {
        if(req.body.querytype == 'login') {

            db.findOne(User, { email: req.body.email }, {}, function(result) {

                if(result) {
                    bcrypt.compare(req.body.password, result.password, function(err, equal) {
                        if(equal) {
                            console.log(result);
                            res.send( result );

                        } else {
                            errMessage = {
                                error: 'wrong password'
                            }
                            //console.log( 'wrong password' );
                            res.send( errMessage ); //send nothing lmao
                        }
                    });
                } else {
                    errMessage = {
                        error: 'email does not exist in database'
                    }
                    // console.log( 'user tried to log in with non-existent email' );
                    res.send( errMessage ); //send nothing lmao
                }
                
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
