// services/auth.service.js — esqueleto
const AuthUser = require('../models/auth.model');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
 
class AuthService {
    async register(data) {
        const { email, password } = data;
 
        // TODO 1: ¿cuántas rondas de sal usamos? ¿por qué ese número?
        const saltRounds = 10;
 
        // TODO 2: encriptar la contraseña ANTES de guardar
        // ¿Por qué await aquí? ¿Qué devuelve bcrypt.hash?
        const hashedPassword = await bcrypt.hash(password, saltRounds);
 
        // TODO 3: crear el usuario con la contraseña encriptada
        // ¿Guardan password o hashedPassword? ¿Por qué?
        const usuario = new AuthUser({
            email,
            password: hashedPassword
        });
 
        return await usuario.save();
    }

    async login(data) {
        const { email, password } = data;
 
        // TODO 1: buscar al usuario por email
        // ¿Qué método de Mongoose busca UN documento por un campo?
        const usuario = await AuthUser.findOne({ email });
 
        // TODO 2: ¿qué devuelve findOne si no encuentra el email?
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
 
        // TODO 3: comparar la contraseña ingresada con el hash guardado
        // Noten: se compara con usuario.password (el hash), no con la original
        const coincide = await bcrypt.compare(password, usuario.password);
 
        if (!coincide) {
            throw new Error('Contraseña incorrecta');
        }
 
        // TODO 4: ¿qué información útil van en el payload?
        const payload = { email: usuario.email };
        return this.generarToken(payload);
    }
 
    async generarToken(payload) {
        // TODO: la clave secreta NO va hardcodeada — ¿dónde debería vivir?
        const claveSecreta = process.env.JWT_SECRET || 'clave_desarrollo';
        const opciones     = { expiresIn: '1h' };  // ¿cuánto tiempo dura el token?
        return jwt.sign(payload, claveSecreta, opciones);
    }
}
module.exports = new AuthService();