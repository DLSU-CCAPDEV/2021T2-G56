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
    }

}

module.exports = controller;
