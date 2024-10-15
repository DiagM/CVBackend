const express = require('express');
const User = require('./models/User'); // Adjust the path according to your project structure
const router = express.Router();
const bcrypt = require('bcrypt'); // Ensure you have bcrypt installed for password hashing

// Authentification user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password); // Adjust this if you're using a different method to compare passwords
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate and send token or user data as needed
        res.status(200).json({ message: 'Login successful', userId: user._id }); // Adjust as necessary
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
