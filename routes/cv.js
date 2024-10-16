const express = require('express');
const CV = require('../models/cv');
const router = express.Router();
const authenticateToken = require('../middlewares/jwt');

/**
 * @swagger
 * components:
 *   schemas:
 *     CV:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Prénom du candidat
 *         surname:
 *           type: string
 *           description: Nom de famille du candidat
 *         email:
 *           type: string
 *           description: Email du candidat
 *         phone:
 *           type: string
 *           description: Numéro de téléphone (facultatif)
 *         experiences:
 *           type: array
 *           items:
 *             type: object
 *             description: Liste des expériences professionnelles
 *         education:
 *           type: array
 *           items:
 *             type: object
 *             description: Liste des formations
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *             description: Compétences du candidat
 *         visible:
 *           type: boolean
 *           default: true
 *           description: Indique si le CV est visible
 */

/**
 * @swagger
 * /api/cv:
 *   post:
 *     summary: Créer un CV
 *     tags: [CV]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: CV créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       500:
 *         description: Erreur du serveur
 */
router.post('/', authenticateToken, async (req, res) => {
    try {
        const newCV = new CV(req.body);
        await newCV.save();
        res.status(201).json(newCV);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/cv/{id}:
 *   put:
 *     summary: Mettre à jour un CV par son ID
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       200:
 *         description: CV mis à jour avec succès
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCV = await CV.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCV) return res.status(404).json({ message: 'CV not found' });
        res.json(updatedCV);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/cv/{id}:
 *   get:
 *     summary: Récupérer un CV par son ID
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV à récupérer
 *     responses:
 *       200:
 *         description: CV récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:cvId', async (req, res) => {
    try {
        const { cvId } = req.params;
        const cv = await CV.findById(cvId);
        if (!cv) return res.status(404).json({ message: 'CV not found' });
        res.json(cv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/cv:
 *   get:
 *     summary: Récupérer tous les CVs
 *     tags: [CV]
 *     responses:
 *       200:
 *         description: Liste de tous les CVs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CV'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
    try {
        const cvs = await CV.find({ visible: true });
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/cv/{id}:
 *   delete:
 *     summary: Supprimer un CV par son ID
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV à supprimer
 *     responses:
 *       200:
 *         description: CV supprimé avec succès
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const cv = await CV.findByIdAndDelete(id);
        if (!cv) return res.status(404).json({ message: 'CV not found' });
        res.status(200).json({ message: 'CV deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
