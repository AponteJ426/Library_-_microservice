const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Proteger todas las rutas con el middleware de autenticación
router.use(authMiddleware);

// Ruta de ejemplo protegida - solo usuarios autenticados pueden acceder
router.get('/perfil', (req, res) => {
    // req.user contiene la información del usuario (desde el token)
    res.json({
        success: true,
        message: 'Perfil accesible',
        user: req.user
    });
});

router.get('/dashboard', async (req, res) => {
    // Aquí podrías obtener libros, estadísticas, etc.
    res.json({
        success: true,
        message: 'Acceso al dashboard',
        data: {
            librosLeyendo: ['Libro 1', 'Libro 2'],
            recomendaciones: ['Libro A', 'Libro B'],
        },
    });
});


module.exports = router;