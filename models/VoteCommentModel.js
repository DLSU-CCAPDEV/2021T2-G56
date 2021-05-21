var mongoose = require('mongoose');


var VoteCommentSchema = new mongoose.Schema({
    voteid: {
        type: Number,
        required: true
    },
    voteowner: {
        type: String,
        required: true
    },
    commentparent: {
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

module.exports = mongoose.model('VoteComment', VoteCommentSchema);
