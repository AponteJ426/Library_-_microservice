const { Request, Response } = require('express'); // Import Request and Response types for better IntelliSense, though not strictly necessary for runtime
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Export the function using CommonJS syntax
exports.getRecomendaciones = async (req, res) => {
    // Convert the user ID from string parameter to a number
    const userId = req.user.userId;

    // Validate if the userId is a valid number
    if (isNaN(userId) || userId <= 0) { // Added check for non-positive IDs as well
        return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    try {
        // 1. Fetch the user's favorite books, including their details
        // This assumes 'favorito' is a model in your Prisma schema with a relation to 'libro'
        const favoritos = await prisma.favorito.findMany({
            where: { userId },
            select: {
                titulo: true,
                autor: true,
                description: true,
            },
        });
        // Check if the user has any favorite books
        if (!favoritos.length) {
            // Return 404 if no favorites are found, as it's not a client error but a data absence
            return res.status(404).json({ error: 'El usuario no tiene libros favoritos' });
        }
        // 2. Format the retrieved data for the AI microservice
        // The microservice expects an array of objects with 'titulo' and 'descripcion'
        const librosFormateados = favoritos.map((fav) => (
            {
                titulo: fav.titulo,
                descripcion: fav.description || '', // Provide an empty string if description is null/undefined
            }
        ));
        const respuesta = await fetch(process.env.MICROSERVICE_URL + '/recomendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Specify content type as JSON
            body: JSON.stringify({ favoritos: librosFormateados }), // Send the formatted favorite books as JSON
        });
        // Check if the microservice response was successful
        if (!respuesta.ok) {
            const errorText = await respuesta.text(); // Get error details from microservice
            console.error('Error del microservicio IA:', errorText);
            return res.status(respuesta.status).json({ error: `Error del microservicio de IA: ${errorText}` });
        }
        // Parse the JSON response from the microservice
        const data = await respuesta.json();
        console.log(data);



        // 4. Send the recommendations received from the microservice back to the frontend
        return res.json({ recomendaciones: data });
    } catch (error) {
        // Catch any errors that occur during the process (e.g., database errors, network issues)
        console.error('Error al obtener recomendaciones:', error);
        // Return a 500 Internal Server Error for unexpected issues
        return res.status(500).json({ error: 'Error interno del servidor al obtener recomendaciones' });
    }
};
