const db = require('../models/db.js');
const Transaction = require('../models/TransactionModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `index.hbs` with all
            transactions currently stored in the database.
    */
    getIndex: function(req, res) {
        // your code here

        var projection = {
                name: 1, 
                refno: 1, 
                amount: 1 
        }

        db.findMany(Transaction, {}, projection, function(result) {
            res.render('index', {result}); // This is to load the page initially
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckRefNo`. This function checks if a
            specific reference number is stored in the database. If the number
            is stored in the database, it returns an object containing the
            reference number, otherwise, it returns an empty string.
    */
    getCheckRefNo: function(req, res) {
        // your code here
        var refno = req.query.refno;
        
        db.findOne(Transaction, {refno: refno}, 'refno' ,function(result) {
            res.send(result);
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the transaction
            sent by the client to the database, then appends the new
            transaction to the list of transactions in `index.hbs`.
    */
    getAdd: function(req, res) {
        var entry = {
            name: req.query.name,
            refno: req.query.refno,
            amount: req.query.amount
        }

        db.insertOne(Transaction, entry, function(flag) {
            if(flag) {
                //do nothing
                res.send(entry);
            }
        });
        
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the transaction
            from the database, then removes the transaction from the list of
            transactions in `index.hbs`.
    */
    getDelete: function (req, res) {
        // your code here
        var conditions = {
            refno: req.query.refno
        }
        db.deleteOne(Transaction, conditions, function(flag) {
            if(!flag) {
                console.log('Uh oh, something went wrong...');
            }
        });
    }

}

module.exports = controller;
