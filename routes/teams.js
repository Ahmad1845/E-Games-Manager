const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');

router.get('/', async (req, res) => {
    try {
        const teams = await Team.aggregate([
            { $lookup: { from: 'players', localField: '_id', foreignField: 'teamId', as: 'members' } },
            { $sort: { createdAt: -1 } }
        ]);
        res.json(teams);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const newTeam = new Team({ teamName: req.body.teamName, game: req.body.game });
        const savedTeam = await newTeam.save();
        if (req.body.members) {
            const memberNames = req.body.members.split(',').map(name => name.trim());
            const playerDocs = memberNames.map(name => ({ name: name, teamId: savedTeam._id }));
            await Player.insertMany(playerDocs);
        }
        res.status(201).json(savedTeam);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        await Player.deleteMany({ teamId: req.params.id }); 
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// NEW FEATURE: Update Team
router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            { teamName: req.body.teamName, game: req.body.game },
            { new: true, runValidators: true }
        );
        if (!updatedTeam) return res.status(404).json({ error: "Team Not Found" });
        res.json(updatedTeam);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
