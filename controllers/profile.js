const User = require('../models/User'); // Assuming you have a User model

// Function to handle editing the profile
exports.editProfile = async (req, res) => {
    const { userId, name, firstName, email, password } = req.body;

    try {
        // Find the user by their ID (userId passed in request body)
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details only if the new values are provided
        if (name) user.name = name;
        if (firstName) user.firstName = firstName;
        if (email) user.email = email;

        // If the password is provided, hash it and update
        if (password) {
            const bcrypt = require('bcrypt');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save the updated user information
        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                name: user.name,
                firstName: user.firstName,
                email: user.email,
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

