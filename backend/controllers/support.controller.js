// controllers/support.controller.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Crear un reporte de soporte
const createSupport = async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const support = await prisma.support.create({
      data: { nombre, correo, mensaje },
    });
    res.status(201).json(support);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el reporte de soporte",
      detalle: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

// Obtener todos los reportes de soporte
const getSupports = async (req, res) => {
  try {
    const supports = await prisma.support.findMany();
    res.status(200).json(supports);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los reportes de soporte",
      detalle: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

// Borrar un reporte de soporte por ID
const deleteSupport = async (req, res) => {
  const { id } = req.params;

  try {
    const support = await prisma.support.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Reporte de soporte eliminado", support });
  } catch (error) {
    res.status(500).json({
      error: "Error al borrar el reporte de soporte",
      detalle: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  createSupport,
  getSupports,
  deleteSupport,
};
