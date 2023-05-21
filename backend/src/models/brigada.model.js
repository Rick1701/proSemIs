"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'brigada'
const brigadaSchema = new mongoose.Schema({
  bri_nombre: {
    type: String,
    required: true,
  },
  bri_cantidad: {
    type: Number,
    required: true,
  },
  bri_especialidad: {
    type: String,
    required: true,
  }
 ,
});

// Crea el modelo de datos 'Brigada' a partir del esquema 'brigadaSchema'
const Brigada = mongoose.model("Brigada", brigadaSchema);

// Exporta el modelo de datos 'Brigada'
module.exports = Brigada;
