const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener estadísticas para el panel de administración
exports.getAdminStats = async (req, res) => {
    try {
        const totalUsuarios = await prisma.user.count();
        const totalEditoriales = await prisma.editorial.count();
        const totalLibros = await prisma.libro.count();
        const totalUserRoles = await prisma.user.groupBy({
            by: ['role'],
            _count: true,
        });
        const registrosMensuales = await prisma.user.groupBy({
            by: ['createdAt'],
            _count: true,
            _max: {
                createdAt: true,
            },
        });

        res.status(200).json({
            success: true,
            stats: {
                totalUsuarios,
                totalEditoriales,
                totalLibros,
                totalUserRoles,
                registrosMensuales,
            },
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error.message);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

// Crear una nueva editorial
exports.createEditorial = async (req, res) => {
    try {
        const { nombre } = req.body;

        const nuevaEditorial = await prisma.editorial.create({
            data: { nombre },
        });

        res.status(201).json({
            success: true,
            message: 'Editorial creada correctamente',
            editorial: nuevaEditorial,
        });
    } catch (error) {
        console.error('Error al crear editorial:', error.message);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

// Cambiar el rol de un usuario
exports.updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        const usuarioActualizado = await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        res.status(200).json({
            success: true,
            message: 'Rol del usuario actualizado correctamente',
            user: usuarioActualizado,
        });
    } catch (error) {
        console.error('Error al actualizar rol del usuario:', error.message);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

// Obtener la lista de usuarios
exports.getUsers = async (req, res) => {
    try {
        const usuarios = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                nombre: true,
            },
        });

        res.status(200).json({
            success: true,
            users: usuarios,
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};
