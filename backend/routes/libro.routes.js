const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getLibros, createLibro } = require('../controllers/libro.controller');

router.get('/', auth, getLibros);
router.post('/', auth, createLibro);

module.exports = router;
