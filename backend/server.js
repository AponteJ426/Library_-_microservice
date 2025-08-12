const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const libroRoutes = require('./routes/libro.routes');
const editorialRoutes = require('./routes/editorial.routes');
const protectedRoutes = require('./routes/protected.routes');
const supportRoutes = require('./routes/support.routes');
const adminRoutes = require('./routes/admin.routes');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const favoritoRoutes = require('./routes/favorito.routes');
const recomendacionRouter = require('./routes/suggestion.routes');

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/editoriales', editorialRoutes);
app.use('/api', protectedRoutes);
app.use('/api/support', supportRoutes);

app.use('/api/admin', adminRoutes); // Registrar rutas de administrador

app.use('/api/favoritos', favoritoRoutes);
app.use('/api/recomendaciones', recomendacionRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

