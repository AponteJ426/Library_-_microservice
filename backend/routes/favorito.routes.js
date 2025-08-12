const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const favoritoController = require('../controllers/favorito.controller');

router.use(authMiddleware); // solo para usuarios autenticados

router.get('/', favoritoController.getFavoritos);
router.post('/', favoritoController.addFavorito);
router.delete('/', favoritoController.removeFavorito);

module.exports = router;
