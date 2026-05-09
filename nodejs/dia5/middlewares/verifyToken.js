// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        // TODO 1: ¿en qué header llega el token?
        const authHeader = req.headers['authorization'];

        // TODO 2: ¿qué pasa si no hay header de autorización?
        if (!authHeader) {
            return res.status(401).json({ error: 'Token no enviado' });
        }

        // El header viene como 'Bearer <token>' — extraer solo el token
        // TODO 3: ¿cómo separan 'Bearer eyJhbGci...' en dos partes?
        const token = authHeader.split(' ')[1];

        // TODO 4: ¿qué método de jwt verifica Y decodifica el token?
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_desarrollo');

        // Guardar la info del usuario en req para que el controlador la use
        req.usuario = decoded;

        // TODO 5: ¿por qué next() va DESPUÉS de verificar y no antes?
        next();

    } catch (error) {
        // jwt.verify lanza error si el token es inválido o expiró
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = verifyToken;