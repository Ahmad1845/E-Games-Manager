const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    teamName: { type: String, required: true },
    game: { type: String, required: true },
    // 1NF FIX: We REMOVED the "members" array from here.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', schema);