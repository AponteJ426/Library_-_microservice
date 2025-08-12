const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    librosInteres: [{ type: String }], // IDs de libros o títulos
    librosLeidos: [{ type: String }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
