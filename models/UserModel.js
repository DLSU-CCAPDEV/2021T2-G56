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
        type: Number,
        required: true
    },
    profileimg: {
        type: String,
        required: false
    },
    upvotecount: {
        type: Number,
        required: false
    },
    bio: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);
