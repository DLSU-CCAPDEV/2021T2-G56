var mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
    commentid: {
        type: Number,
        required: true
    },
    ownerid: {
        type: Number,
        required: true
    },
    ownerusername: {
        type: String,
        required: true
    },
    postparent: {
        type: Number,
        required: true
    },
    commentcaption: {
        type: String,
        required: false
    },
    datecreated: {
        type: Number,
        required: true
    },
    dateedited: {
        type: Number,
        required: false
    },
    upvotecount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
