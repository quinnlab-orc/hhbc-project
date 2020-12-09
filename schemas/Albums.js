const mongoose = require('mongoose');

const Albums = new mongoose.Schema({
    album1: {
        type: Object
    },
    album2: {
        type: Object
    },
    album3: {
        type: Object
    }
})

module.exports = mongoose.model('albums', Albums)