// config/index.js
// TODO: cargar dotenv PRIMERO antes que todo
// ¿Por qué debe ser la primera línea de este archivo?
require('dotenv').config();
 
module.exports = {
    // TODO: ¿qué pasa si PORT no está definido en .env?
    port:      process.env.PORT     || 3000,
    mongoUri:  process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
};