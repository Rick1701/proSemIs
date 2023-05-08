"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'incidentes'
const incidenteSchema = new mongoose.Schema({
    inc_descripcion:{
    type: String,
    required: true,
  }
});

// Crea el modelo de datos 'Incidente' a partir del esquema 'incidenteSchema'
const Incidente = mongoose.model("Incidente", incidenteSchema);

// Exporta el modelo de datos 'Incidente'
module.exports = Incidente;
