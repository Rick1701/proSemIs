"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'ubicacion'
const ubicacionSchema = new mongoose.Schema({
  ubi_comuna: {
    type: String,
    required: true,
  },
  ubi_cantidadPlantacion: {
    type: String,
    required: true,
  },
  ubi_tipoPlantacion: {
    type: String,
    required: true,
  },

});

// Crea el modelo de datos 'Ubicacion' a partir del esquema 'ubicacionSchema'
const Ubicacion = mongoose.model("Ubicacion", ubicacionSchema);

// Exporta el modelo de datos 'Ubicacion'
module.exports = Ubicacion;
