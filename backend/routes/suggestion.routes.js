const express = require('express');
const { getRecomendaciones } = require('../controllers/suggestion.controller.js');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getRecomendaciones);

module.exports = router;