const mongoose = require('mongoose');

const UserVotes = new mongoose.Schema({
    user: {
        type: String
    },
    vote: {
        type: Number,
        default: 1
    },
    album: {
        type: String
    }
})

module.exports = mongoose.model('vote', UserVotes)