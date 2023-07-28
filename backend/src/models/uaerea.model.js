"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const uaereaSchema = new mongoose.Schema({
  uaerea_nombre: {
    type: String,
    required: true,
  },
  uaerea_estado_unidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado_Unidad",
    required: true,
  },
  uaerea_incidente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incidente",
    default: null,
  },
  uaerea_base: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Base",
    required: true,
  },
});

// Crea el modelo de datos 'Uaerea' a partir del esquema 'uaereaSchema'
const Uaerea = mongoose.model("Uaerea", uaereaSchema);

// Exporta el modelo de datos 'Uaerea'
module.exports = Uaerea;
