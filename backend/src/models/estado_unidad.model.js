"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const estado_unidadSchema = new mongoose.Schema({
  est_uni_descripcion: {
    type: String,
    required: true,
    //enum: ["Operativa", "No Operativa"],
  },
  est_uni_aerea: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Uaerea",
    required: true,
  }],
  est_uni_terrestre: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Uterrestre",
    required: true,
  }],
});

// Crea el modelo de datos 'Estado_unidad' a partir del esquema 'estado_unidadSchema'
const Estado_unidad = mongoose.model("Estado_unidad", estado_unidadSchema);

// Exporta el modelo de datos 'Estado_unidad'
module.exports = Estado_unidad;
