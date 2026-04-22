const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

router.post('/', async (req, res) => {
    try {
        const newMatch = new Match(req.body);
        await newMatch.save();
        res.status(201).json(newMatch);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:tournamentId', async (req, res) => {
    try {
        const matches = await Match.find({ tournamentId: req.params.tournamentId })
            .populate('teamA', 'teamName')
            .populate('teamB', 'teamName')
            .populate('winner', 'teamName');
        res.json(matches);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    try {
        const { scoreA, scoreB, teamA, teamB } = req.body;
        let winner = null;
        if (Number(scoreA) > Number(scoreB)) winner = teamA;
        if (Number(scoreB) > Number(scoreA)) winner = teamB;
        const updated = await Match.findByIdAndUpdate(
            req.params.id,
            { scoreA, scoreB, winner, status: 'Completed' },
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: "Match Not Found" });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
