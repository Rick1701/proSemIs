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
    type: Number,
    required: true,
  },
  base_incendios_asistidos: {
    type: Number,
    required: true,
  },

  base_brigada: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref:"Brigada"
  }],
  base_uaerea: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Uaerea"
  }],
  base_uterrestre: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Uterrestre"
  }],
  base_incendio_actual: {
  type: mongoose.Schema.Types.ObjectId,
    ref: "Siniestro",
    required: false,
  },
  base_estado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado_Base",
    required: false,
  }

});

// Crea el modelo de datos 'Base' a partir del esquema 'siniestroSchema'
const Base = mongoose.model("Base", baseSchema);

// Exporta el modelo de datos 'Base'
module.exports = Base;
