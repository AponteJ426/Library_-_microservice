

const jwt = require('jsonwebtoken');

// Esta clave secreta debería estar en variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token no encontrado en cookies' });
    }

    try {
        // Verificar token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Añadir usuario a la request

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error de token:', error.message);
        res.status(401).json({ success: false, message: 'Token no válido o expirado' });
    }
};

module.exports = authMiddleware;

