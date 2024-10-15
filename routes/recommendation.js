const express = require('express');
const Recommendation = require('../models/recommendation');
const router = express.Router();

// Ajouter une recommandation
router.post('/', async (req, res) => {
    const { cvId, userId, content } = req.body;

    try {
        const recommendation = new Recommendation({ cvId, userId, content });
        await recommendation.save();
        res.status(201).json(recommendation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer les recommandations pour un CV spécifique
router.get('/:cvId', async (req, res) => {
    const { cvId } = req.params;

    try {
        const recommendations = await Recommendation.find({ cvId }).populate('userId', 'name surname');
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer toutes les recommandations
router.get('/', async (req, res) => {
    try {
        const recommendations = await Recommendation.find().populate('cvId').populate('userId', 'name surname');
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
