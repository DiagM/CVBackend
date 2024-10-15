const Recommendation = require('../models/recommendation');

// Créer une recommandation
const createRecommendation = async (req, res) => {
    try {
        const newRecommendation = new Recommendation(req.body);
        await newRecommendation.save();
        res.status(201).json(newRecommendation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir toutes les recommandations pour un CV
const getRecommendationsByCV = async (req, res) => {
    try {
        const recommendations = await Recommendation.find({ cvId: req.params.id }).populate('userId', 'name surname'); // Remplir les informations utilisateur
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRecommendation,
    getRecommendationsByCV,
};
