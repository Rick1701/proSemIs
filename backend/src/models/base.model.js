"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const baseSchema = new mongoose.Schema({
  base_descripcion: {
    type: String,
    required: true,
  },
  base_latitud: {
    type: String,
    required: true,
  }
 ,
});

// Crea el modelo de datos 'Base' a partir del esquema 'siniestroSchema'
const Base = mongoose.model("Base", baseSchema);

// Exporta el modelo de datos 'Base'
module.exports = Base;