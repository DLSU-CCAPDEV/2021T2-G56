
var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    // your code here
    name: {
        type: String,
        required: true
    },
    refno: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);
