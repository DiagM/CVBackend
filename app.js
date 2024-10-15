// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || '3000';
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const apiRouter = require('./routes'); // Assurez-vous que ce fichier exporte vos routeurs
const cors = require('cors');

// Autoriser l'accès extérieur au serveur
app.use(cors());

// Parse des requêtes en JSON
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'CV API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Spécifie où Swagger doit trouver les définitions
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Connexion à la base de données avec Mongoose
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(`Database connection error: ${error}`);
    });

// Route pour la documentation Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Récupération des définitions de routes
app.use('/api/', apiRouter); // Utilise les routes définies dans le fichier ./routes/index.js

// Lance le serveur sur le port renseigné
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
