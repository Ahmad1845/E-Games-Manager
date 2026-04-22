const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    game:        { type: String, required: true }, // e.g., "Valorant"
    entryFee:    { type: Number, default: 0 },
    prizePool:   { type: Number, default: 0 },
    startDate:   { type: Date },
    status:      { type: String, enum: ['Open', 'Ongoing', 'Completed'], default: 'Open' },
    winner:      { type: String, default: null }, // We will store the Team Name here later
    createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tournament', TournamentSchema);