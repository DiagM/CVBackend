// routes/index.js
const express = require('express');
const authRouter = require('./auth'); // Importer les routes d'authentification
const cvRouter = require('./cv'); // Importer les routes de CV
const recommendationRoutes = require('./routes/recommendation');

const router = express.Router();

// Définir les routes
router.use('/auth', authRouter); // Routes d'authentification
router.use('/cv', cvRouter); // Routes de CV
app.use('/api/recommendations', recommendationRoutes);

module.exports = router;
