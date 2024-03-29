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
  },
  brig_sexo: {
    type: String,
    required: true,
    enum: ["Masculino", "Femenino", "Otro"],
  },
  brig_edad: {
    type: Number,
    required: true,
  },
  brig_estado_brigadista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado_Brigadista",
    required: true,
    default: null,
  },
  brig_brigada: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigada",
    required: true,
  },
  brig_incidente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incidente",
    required: false,
  },
});

// Crea el modelo de datos 'Brigadista' a partir del esquema 'brigadistaSchema'
const Brigadista = mongoose.model("Brigadista", brigadistaSchema);

// Exporta el modelo de datos 'Brigadista'
module.exports = Brigadista;
