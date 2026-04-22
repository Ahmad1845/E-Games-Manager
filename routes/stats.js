const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tournament = require('../models/Tournament');
const Match = require('../models/Match');

router.get('/:tournamentId', async (req, res) => {
    try {
        const tId = new mongoose.Types.ObjectId(req.params.tournamentId);
        const tournament = await Tournament.findById(tId);

        if (!tournament) return res.status(404).json({ error: "Tournament Not Found" });

        const totalMatches = await Match.countDocuments({ tournamentId: tId });
        const completedMatches = await Match.countDocuments({ tournamentId: tId, status: 'Completed' });

        const leaderboard = await Match.aggregate([
            { $match: { tournamentId: tId, winner: { $ne: null } } },
            { $group: { _id: "$winner", wins: { $sum: 1 } } }, 
            { $sort: { wins: -1 } }, 
            { $limit: 3 },
            { $lookup: { from: 'teams', localField: '_id', foreignField: '_id', as: 'teamInfo' } },
            { $unwind: "$teamInfo" },
            { $project: { teamName: "$teamInfo.teamName", wins: 1 } }
        ]);

        res.json({
            tournament: tournament,
            stats: { totalMatches, completedMatches },
            leaderboard: leaderboard
        });
    } catch (err) {
        console.error("Stats Error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
