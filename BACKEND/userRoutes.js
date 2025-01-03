// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const utilisateurController = require('./user.controllers');
const authenticateJWT = require('./authMiddleware');

router.post('/login', utilisateurController.login);
router.post('/register', utilisateurController.register);
router.post('/disconnect', utilisateurController.disconnect);
router.post('/updateProfil', utilisateurController.updateProfil);
router.get('/fetch-data', utilisateurController.fetchData);
router.get('/protected', authenticateJWT, utilisateurController.protectedRoute);

module.exports = router;