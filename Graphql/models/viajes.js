const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    foto: String
});

module.exports = mongoose.model('viaje', viajeSchema);