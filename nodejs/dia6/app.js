// app.js — solo configuración y conexión
const express = require('express');
const menuRouter = require('./routes/menu.routes');
const logger = require('./middlewares/logger');
const authRouter = require('./routes/auth.routes');
const { port } = require('./config'); // Importar puerto

const app = express();

app.use(express.json());
app.use(logger);

// Conectar el router de autenticación
app.use('/auth', authRouter);  // agregar junto a los otros routers

// Conectar el router del menú
app.use('/menu', menuRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Restaurante Node API',
        version: '2.0.0',
        rutas: ['/menu']
    });
});

const conectarDB = require('./database/connection.js');
 
// Conectar a MongoDB antes de levantar el servidor
conectarDB();
 
// ... resto del app.js sin cambios

app.listen(port, () => {
    console.log(`Restaurante corriendo en http://localhost:${port}`);
});