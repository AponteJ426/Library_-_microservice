const express = require('express');
const router = express.Router();
const { getAdminStats, createEditorial, updateUserRole, getUsers } = require('../controllers/admin.controller');
const { verifyToken } = require('../controllers/auth.controller');
const { isAdmin } = require('../middleware/admin.middleware');

// Obtener estadísticas del panel de administración
router.get('/stats', verifyToken, isAdmin, getAdminStats);

// Crear una nueva editorial
router.post('/editorial', verifyToken, isAdmin, createEditorial);

// Actualizar el rol de un usuario
router.put('/user/role', verifyToken, isAdmin, updateUserRole);

// Obtener la lista de usuarios
router.get('/users', verifyToken, isAdmin, getUsers);

module.exports = router;
