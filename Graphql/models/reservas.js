const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    nombre: String,
    rut: String,
    tour: String,
    telefono: String,
    fecha: String
});

module.exports = mongoose.model('reserva', reservaSchema);