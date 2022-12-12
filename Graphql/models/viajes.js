const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema({
    id: ID,
    nombre: String,
    descripcion: String,
    foto: String
});

module.exports = mongoose.model('viaje', viajeSchema);