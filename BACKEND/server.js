const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();

// Configuration des CORS
const corsOptions = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: "Content-Type, Authorization",
    exposedHeaders: 'Authorization'
};

app.use(cors(corsOptions)); // Middleware CORS
app.use(express.json()); // Support JSON
app.use(express.urlencoded({ extended: true })); // Support URL-encoded data
// Chargement des routes API
require("./routes/product.routes")(app);
require("./routes/user.routes")(app);

// Route de base
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Gestion des fichiers statiques
app.use(express.static(path.join(__dirname, 'FRONTEND/dist/my-angular-app')));

// Catch-all pour Angular
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'FRONTEND/dist/my-angular-app/index.html'));
});
// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});