var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    datecreated: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    profileimg: {
        type: String,
        required: true
    },
    upvotecount: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);