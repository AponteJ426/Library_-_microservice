const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los favoritos del usuario
exports.getFavoritos = async (req, res) => {
    const userId = req.user.userId;

    try {
        const favoritos = await prisma.favorito.findMany({
            where: { userId },
        });

        const soloIds = favoritos.map(fav => fav.libroId);
        res.json({ favoritos: soloIds });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
};

// Añadir favorito
exports.addFavorito = async (req, res) => {
    const userId = req.user.userId;
    const { libroId, libroData } = req.body;


    try {
        const nuevo = await prisma.favorito.create({
            data: {
                libroId,
                titulo: libroData.titulo,
                autor: libroData.autor,
                imagen: libroData.imagen,
                // description: libroData.descripcion,
                userId,
            },
        });
        res.status(201).json({ mensaje: 'Favorito agregado', favorito: nuevo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ya está en favoritos o ocurrió un error' });
    }
};

// Eliminar favorito
exports.removeFavorito = async (req, res) => {
    const userId = req.user.userId;
    const { libroId } = req.body;

    try {
        await prisma.favorito.delete({
            where: {
                libroId_userId: {
                    libroId,
                    userId,
                },
            },
        });

        res.json({ mensaje: 'Favorito eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el favorito' });
    }
};
