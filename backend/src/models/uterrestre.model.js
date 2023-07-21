"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const uterrestreSchema = new mongoose.Schema({
  uterrestre_nombre: {
    type: String,
    required: true,
  },
  uterrestre_estado_unidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado_Unidad",
    required: true,
  },
  uterrestre_incidente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incidente",
    default: null,
  },
  uterrestre_base: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Base",
    required: true,
  },
});

// Crea el modelo de datos 'Uterrestre' a partir del esquema 'uterrestreSchema'
const Uterrestre = mongoose.model("Uterrestre", uterrestreSchema);

// Exporta el modelo de datos 'Uterrestre'
module.exports = Uterrestre;
