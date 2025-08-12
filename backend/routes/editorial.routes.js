const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getEditoriales, createEditorial } = require('../controllers/editorial.controller');

router.get('/', auth, getEditoriales);
router.post('/', auth, createEditorial);

module.exports = router;
