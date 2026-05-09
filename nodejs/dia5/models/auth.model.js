// models/auth.model.js
const mongoose = require('mongoose');
 
// TODO: ¿qué campos necesita un usuario de autenticación?
// Piensen: ¿con qué se identifica? ¿qué secreto guarda?
const authSchema = new mongoose.Schema({
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });
 
// TODO: ¿por qué unique:true en email es importante?
// ¿Qué pasaría si dos admins tuvieran el mismo email?
 
const AuthUser = mongoose.model('AuthUser', authSchema);
module.exports = AuthUser;