const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        req.session.testmessage = 'this is a session test message hi :D';
        res.render('index');
    }

}

module.exports = controller;