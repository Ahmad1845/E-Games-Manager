const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

router.get('/', async (req, res) => {
    try {
        const t = await Tournament.find().sort({ createdAt: -1 });
        res.json(t);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const newT = new Tournament(req.body);
        await newT.save();
        res.status(201).json(newT);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        await Tournament.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// NEW FEATURE: Update Tournament
router.put('/:id', async (req, res) => {
    try {
        const updatedT = await Tournament.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedT) return res.status(404).json({ error: "Tournament Not Found" });
        res.json(updatedT);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
