const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLibros = async (req, res) => {
    const libros = await prisma.libro.findMany({ include: { editorial: true } });
    res.json(libros);
};

exports.createLibro = async (req, res) => {
    const { titulo, autor, editorialId } = req.body;
    try {
        const libro = await prisma.libro.create({
            data: { titulo, autor, editorialId },
        });
        res.json(libro);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear libro' });
    }
};
