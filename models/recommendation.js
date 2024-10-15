const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true }, // Référence au CV
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur qui laisse la recommandation
    comment: { type: String, required: true }, // Commentaire de la recommandation
}, { timestamps: true });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
