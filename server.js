require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import Routes
const tournamentRoutes = require('./routes/tournaments');
const teamRoutes = require('./routes/teams');
const matchRoutes = require('./routes/matches');
const statRoutes = require('./routes/stats');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// --- CONNECTION STRING ---

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('✅ DB Connected Successfully!'))
    .catch(err => console.error('❌ DB Connection Error:', err));

// --- ROUTES ---
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/tasks', taskRoutes);

// FORCE FRONTEND LOAD
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));