var mongoose = require('mongoose');


var VotePostSchema = new mongoose.Schema({
    voteid: {
        type: Number,
        required: true
    },
    voteowner: {
        type: String,
        required: true
    },
    postparent: {
        type: Number,
        required: true
    },
    votetype: {
        type: String,
        required: true
    },
    votedate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('VotePost', VotePostSchema);
