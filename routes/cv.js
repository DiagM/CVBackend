const express = require('express');
const CV = require('../models/cv'); // Ensure this model is defined correctly
const router = express.Router();

// Create a CV
const createCV = async (req, res) => {
    try {
        const newCV = new CV(req.body); // Add the request body data
        await newCV.save();
        res.status(201).json(newCV);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a CV by ID
const updateCV = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCV = await CV.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCV) return res.status(404).json({ message: 'CV not found' });
        res.json(updatedCV);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a CV by ID
const getCV = async (req, res) => {
    try {
        const { id } = req.params;
        const cv = await CV.findById(id);
        if (!cv) return res.status(404).json({ message: 'CV not found' });
        res.json(cv);
    } catch (error) {
        console.error('Error retrieving CV:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all CVs
const getAllCVs = async (req, res) => {
    try {
        const cvs = await CV.find();
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a CV by ID
const deleteCV = async (req, res) => {
    try {
        const { id } = req.params;
        const cv = await CV.findByIdAndDelete(id); // Attempt to delete the CV by ID
        if (!cv) return res.status(404).json({ message: 'CV not found' }); // Handle case where CV does not exist
        res.status(200).json({ message: 'CV deleted successfully' }); // Respond with success message
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle server errors
    }
};

// Define the routes
router.post('/', createCV); // Create CV
router.put('/:id', updateCV); // Update CV by ID
router.get('/:id', getCV); // Get CV by ID
router.get('/', getAllCVs); // Get all CVs
router.delete('/:id', deleteCV); // Delete CV by ID

// Export the router
module.exports = router;

