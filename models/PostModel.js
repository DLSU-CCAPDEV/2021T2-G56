var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
    postid: {
        type: Number,
        required: true
    },
    ownerid: {
        type: String,
        required: true
    },
    postcaption: {
        type: String,
        required: true
    },
    postlocation: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true
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

module.exports = mongoose.model('Post', PostSchema);
