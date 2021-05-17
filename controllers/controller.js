const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        var projection = {
                name: 1, 
                refno: 1, 
                amount: 1 
        }

        db.findMany(User, {}, projection, function(result) {
            res.render('index', {result});
        });
    },

    getTest: function(req, res) {
        res.render('test');
    },

    getCheckRefNo: function(req, res) {
        var refno = req.query.refno;
        
        db.findOne(User, {refno: refno}, 'refno' ,function(result) {
            res.send(result);
        });
    },


    getAdd: function(req, res) {
        var entry = {
            name: req.query.name,
            refno: req.query.refno,
            amount: req.query.amount
        }

        db.insertOne(User, entry, function(flag) {
            if(flag) {
                //do nothing
                res.send(entry);
            }
        });
        
    },


    getDelete: function (req, res) {
        // your code here
        var conditions = {
            refno: req.query.refno
        }
        db.deleteOne(User, conditions, function(flag) {
            if(!flag) {
                console.log('Uh oh, something went wrong...');
            }
        });
    }

}

module.exports = controller;
