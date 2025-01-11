const { v4: uuidv4 } = require("uuid");
const { ACCESS_TOKEN_SECRET } = require("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}


const userList = [{
    username: "shamim",
    password: "1234567",
    id: uuidv4()
}]
exports.login = (req, res) => {
    const { username, password } = req.body; // Modifié pour utiliser 'username'

    // Vérification des champs requis
    if (!username || !password) {
        return res.status(400).json({ error: "Username et mot de passe requis" }); // Texte d'erreur ajusté
    }

    // Recherche de l'utilisateur
    const authUser = userList.find((user) => user.username === username && user.password === password);

    if (!authUser) {
        return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Création du token d'accès
    const user = {
        id: authUser.id,
        username: authUser.username, // Utilise 'username'
    };

    const accessToken = generateAccessToken(user);

    // Réponse au client avec le token
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.status(200).json({ user: user, token: accessToken }); // Amélioration pour retourner aussi le token
};


exports.addUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    // Assuming you have a function to save this user in your database:
    const newUser = { id: Date.now(), username, password }; // Simplified example
    console.log('New User Added:', newUser);
    res.status(201).json(newUser);
};



exports.updateUser = (req, res) => {
    const user = {
        username: req.body.login,
        password: req.body.password,
        id: req.body.id
    };

    let pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(user.login) && pattern.test(user.password)) {
        const index = userList.findIndex((obj) => obj.id === user.id && obj.login === user.login);
        if (index != -1) {
            userList[index] = user;
        };
    };
};

exports.getUser = (req, res) => {
    const authUser = userList.filter((obj) => obj.id === req.query.id)[0];
    if (authUser) {
        res.send(authUser);
    };
};