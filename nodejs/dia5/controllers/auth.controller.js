// controllers/auth.controller.js — esqueleto
const authService = require('../services/auth.service');
 
exports.register = async (req, res) => {
    try {
        // TODO: ¿qué datos llegan en req.body para el registro?
        await authService.register(req.body);
        // TODO: ¿qué código de estado corresponde a un registro exitoso?
        res.status(201).json({ mensaje: 'Administrador registrado' });
    } catch (error) {
        // TODO: ¿qué código envían si el email ya existe (duplicate key)?
        res.status(400).json({ error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        // TODO: llamar al service y recibir el token
        const token = await authService.login(req.body);
        // TODO: ¿con qué código de estado responde un login exitoso?
        res.status(200).json({ token });
    } catch (error) {
        // TODO: ¿401 o 400 para credenciales incorrectas? Justifiquen.
        res.status(401).json({ error: error.message });
    }
};