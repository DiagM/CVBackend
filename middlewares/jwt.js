const jwt = require('jsonwebtoken');
const UserModel = require('./../models/User');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // Vérifiez si le token est fourni
    if (!token) {
        return res.status(403).send('Token is required');
    }

    // Supprimez le préfixe "Bearer " si présent
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    // Vérifiez le token
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user; // Ajoutez l'utilisateur à la requête
        next(); // Passez au middleware suivant
    });
};

module.exports = verifyToken;
