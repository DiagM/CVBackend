const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },     // Titre du poste
    company: { type: String, required: true },   // Nom de l'entreprise
    location: { type: String, required: true },  // Lieu de l'entreprise
    startDate: { type: Date, required: true },   // Date de début de l'expérience
    endDate: { type: Date },                     // Date de fin (facultative)
    description: { type: String, required: true }, // Description du poste et des responsabilités
}, { _id: false }); // Pour éviter la création d'un _id pour chaque expérience

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },     // Diplôme obtenu
    institution: { type: String, required: true }, // Nom de l'institution
    location: { type: String, required: true },   // Lieu de l'institution
    startDate: { type: Date, required: true },    // Date de début de la formation
    endDate: { type: Date },                      // Date de fin (facultative)
}, { _id: false }); // Éviter un _id pour chaque formation

// const recommendationSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // L'utilisateur qui laisse la recommandation
//     comment: { type: String, required: true },                                     // Commentaire laissé
// }, { timestamps: true });

const cvSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },           // Prénom de l'utilisateur
    surname: { type: String, required: true },        // Nom de l'utilisateur
    email: { type: String, required: true },          // Email de l'utilisateur
    phone: { type: String },                          // Numéro de téléphone (facultatif)
    description: { type: String },                    // Description générale du CV (facultatif)
    experiences: [experienceSchema],                  // Tableau d'expériences professionnelles
    education: [educationSchema],                     // Tableau de formations
    skills: [{ type: String }],                       // Tableau des compétences
    // recommendations: [recommendationSchema],          // Tableau de recommandations
    visible: { type: Boolean, default: true },        // Indicateur si le CV est visible ou non
}, { timestamps: true });

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
