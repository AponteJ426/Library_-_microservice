const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
// Este archivo contiene la configuración de la base de datos MongoDB.
// Se utiliza Mongoose para establecer la conexión.
// La URI de conexión se obtiene de las variables de entorno.
// Si la conexión es exitosa, se imprime un mensaje de éxito en la consola.
// Si ocurre un error, se imprime un mensaje de error y se termina el proceso.
// La función connectDB se exporta para ser utilizada en otros módulos.
// La conexión a la base de datos es esencial para el funcionamiento de la aplicación.
// Se recomienda manejar los errores de conexión adecuadamente para evitar problemas en la aplicación.