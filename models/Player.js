const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    // Links the player to a specific Team ID
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }
});

module.exports = mongoose.model('Player', schema);