const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' },
    
    // 3NF FIX: We store IDs (References) instead of Strings
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    
    scoreA: { type: Number, default: 0 },
    scoreB: { type: Number, default: 0 },
    
    // Winner is also an ID now
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
    
    status: { type: String, enum: ['Scheduled', 'Live', 'Completed'], default: 'Scheduled' },

    //  The Round Name
    round: { type: String, default: 'Group Stage' }
});

module.exports = mongoose.model('Match', schema);