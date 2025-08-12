const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getEditoriales = async (req, res) => {
    const editoriales = await prisma.editorial.findMany();
    res.json(editoriales);
};

exports.createEditorial = async (req, res) => {
    const { nombre } = req.body;
    try {
        const editorial = await prisma.editorial.create({ data: { nombre } });
        res.json(editorial);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear editorial' });
    }
};
