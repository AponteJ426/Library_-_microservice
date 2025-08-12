const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Esta clave secreta debería estar en variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.registerUser = async (req, res) => {
    try {
        const { email, password, nombre, role } = req.body;

        const result = await prisma.$transaction(async (tx) => {
            // 1. Verificar si el usuario ya existe
            const existeUsuario = await tx.user.findUnique({ where: { email } });
            if (existeUsuario) {
                const error = new Error('El correo ya está registrado');
                error.statusCode = 400;
                throw error;
            }

            // 2. Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // 3. Crear el nuevo usuario
            const nuevoUsuario = await tx.user.create({
                data: {
                    email,
                    nombre,
                    password: hashedPassword,
                    role: role || 'USER',
                }
            });

            // 4. Generar el token JWT
            let token;
            try {
                token = jwt.sign(
                    { userId: nuevoUsuario.id, email: nuevoUsuario.email, role: nuevoUsuario.role },
                    JWT_SECRET,
                    { expiresIn: JWT_EXPIRES_IN }
                );
            } catch (e) {
                // Si la generación del token falla, lanzar un error para revertir la transacción
                throw new Error('Error al generar el token de autenticación.');
            }

            return { nuevoUsuario, token };
        });

        // Si la transacción es exitosa, enviar la respuesta
        res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente',
            token: result.token,
            user: {
                id: result.nuevoUsuario.id,
                email: result.nuevoUsuario.email,
                nombre: result.nuevoUsuario.nombre,
                role: result.nuevoUsuario.role
            }
        });

    } catch (error) {
        console.error('Error en registro:', error.message);
        const statusCode = error.statusCode || 500;
        const message = error.statusCode ? error.message : 'Error del servidor';
        res.status(statusCode).json({ success: false, message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        // Buscar el usuario por email
        const { email, password } = req.body;

        const usuario = await prisma.user.findUnique({ where: { email } });

        // Si no existe el usuario o la contraseña es incorrecta
        if (!usuario) {
            return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
        }
        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
        }
        // Generar token JWT
        const token = jwt.sign(
            {
                userId: usuario.id,
                email: usuario.email,
                role: usuario.role // Incluir role en el token
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res
            .cookie('token', token, {
                httpOnly: true,
                secure: false, // Cambia a true en producción (HTTPS)
                sameSite: 'Lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 día
            })

        res.status(200)
            .json({
                success: true,
                message: 'Inicio de sesión exitoso',
                user: {
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    role: usuario.role // Incluir role en la respuesta
                }
            });
    } catch (error) {
        console.log(req.body);

        console.error('Error en login:', error.message);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

exports.logoutUser = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false,
    });
    res.json({ success: true, message: 'Sesión cerrada' });
};

// Middleware para verificar token (proteger rutas)exports.verifyToken = (req, res, next) => {
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token no encontrado en cookies' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error de token:', error.message);
        res.status(401).json({ success: false, message: 'Token no válido o expirado' });
    }
};
