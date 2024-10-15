const express = require('express');
const Recommendation = require('../models/recommendation');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Recommendation:
 *       type: object
 *       required:
 *         - cvId
 *         - userId
 *         - comment
 *       properties:
 *         cvId:
 *           type: string
 *           description: ID du CV recommandé
 *         userId:
 *           type: string
 *           description: ID de l'utilisateur ayant fait la recommandation
 *         comment:
 *           type: string
 *           description: Commentaire de la recommandation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de la recommandation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour de la recommandation
 */

/**
 * @swagger
 * /api/recommendation:
 *   post:
 *     summary: Ajouter une nouvelle recommandation
 *     tags: [Recommendation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recommendation'
 *     responses:
 *       201:
 *         description: Recommandation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       500:
 *         description: Erreur du serveur
 */
router.post('/', async (req, res) => {
    const { cvId, userId, comment } = req.body;

    try {
        const recommendation = new Recommendation({ cvId, userId, comment });
        await recommendation.save();
        res.status(201).json(recommendation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/recommendation/{cvId}:
 *   get:
 *     summary: Récupérer les recommandations pour un CV spécifique
 *     tags: [Recommendation]
 *     parameters:
 *       - in: path
 *         name: cvId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV pour lequel on récupère les recommandations
 *     responses:
 *       200:
 *         description: Liste des recommandations pour le CV
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       500:
 *         description: Erreur du serveur
 */
router.get('/:cvId', async (req, res) => {
    const { cvId } = req.params;

    try {
        const recommendations = await Recommendation.find({ cvId }).populate('userId', 'name surname');
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/recommendation:
 *   get:
 *     summary: Récupérer toutes les recommandations
 *     tags: [Recommendation]
 *     responses:
 *       200:
 *         description: Liste de toutes les recommandations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       500:
 *         description: Erreur du serveur
 */
router.get('/', async (req, res) => {
    try {
        const recommendations = await Recommendation.find().populate('cvId').populate('userId', 'name surname');
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
