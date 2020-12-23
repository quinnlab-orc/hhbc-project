const mongoose = require('mongoose');

const UserAlbums = new mongoose.Schema({
    user: {
        type: String
    },
    artist: {
        type: String
    },
    album: {
        type: String
    }
})

module.exports = mongoose.model('userAlbum', UserAlbums)