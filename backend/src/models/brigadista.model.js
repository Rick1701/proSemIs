"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'brigadista'
const brigadistaSchema = new mongoose.Schema({
  brig_rut: {
    type: String,
    required: true,
  },
  brig_nombres: {
    type: String,
    required: true,
  },
  brig_apellidos: {
    type: String,
    required: true,
  }
 ,
});

// Crea el modelo de datos 'Brigadista' a partir del esquema 'brigadistaSchema'
const Brigadista = mongoose.model("Brigadista", brigadistaSchema);

// Exporta el modelo de datos 'Brigadista'
module.exports = Brigadista;
