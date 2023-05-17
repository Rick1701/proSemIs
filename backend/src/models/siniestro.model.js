"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const siniestroSchema = new mongoose.Schema({
  sin_velocidadViento: {
    type: String,
    required: true,
  },
  sin_temperatura: {
    type: String,
    required: true,
  },
  sin_humedad: {
    type: String,
    required: true,
  },
  sin_fechaInicio: {
    type: Date,
    required: true,
  },
  sin_fechaTermino: {
    type: Date,
    required: true,
  },
  sin_latitud: {
    type: Number,
    required: true,
  },
  sin_superficie: {
    type: String,
    required: true,
  },
  sin_distribucion_fuego: {
    type: String,
    required: true,
  }
 ,
});

// Crea el modelo de datos 'Siniestro' a partir del esquema 'siniestroSchema'
const Siniestro = mongoose.model("Siniestro", siniestroSchema);

// Exporta el modelo de datos 'Siniestro'
module.exports = Siniestro;
