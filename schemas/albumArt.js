const mongoose = require('mongoose');

const albumArt = new mongoose.Schema({
    albumUrl: {
        type: Object
    },
    album: {
        type: Object
    },
    artist: {
        type: Object
    }
})

module.exports = mongoose.model('albumArt', albumArt)