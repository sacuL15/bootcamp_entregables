// database/connection.js
// TODO 1: importar mongoose
const mongoose = require('mongoose');
const { mongoUri } = require('../config'); // Importar configuración
const connectDB = async () => {
    try {
        // TODO 2: ¿qué método de mongoose inicia la conexión?
        await mongoose.connect(mongoUri);
        console.log('MongoDB conectado — restaurante');
    } catch (error) {
        // TODO 3: ¿qué debería hacer el servidor si no puede conectarse a la BD?
        console.error('Error de conexión:', error.message);
        process.exit(1); // Salir del proceso con error
    }
}
// TODO 4: exportar la función para usarla en app.js
module.exports = connectDB;