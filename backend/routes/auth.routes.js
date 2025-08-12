const express = require('express');
const router = express.Router();
const {
    loginUser,
    registerUser,
    logoutUser
} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');


// POST /api/auth/login
router.post('/login', loginUser);

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/logout
router.post('/logout', logoutUser);

router.get('/verify', authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Sesión válida',
        user: req.user, // El usuario fue cargado desde el token por el middleware
    });
});



module.exports = router;