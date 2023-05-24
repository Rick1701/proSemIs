"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'estado_brigada'
const estado_brigadaSchema = new mongoose.Schema({
  estabr_descripcion: {
    type: String,
    required: true,
    enum :["Totalmente Disponible","Parcialmente Disponible"],
  },
  estabr_brigada: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigada",
    required: true,
  }],

});

// Crea el modelo de datos 'Estado_Brigada' a partir del esquema 'estado_brigadaSchema'
const Estado_Brigada = mongoose.model("Estado_Brigada", estado_brigadaSchema);

// Exporta el modelo de datos 'Estado_Brigada}'
module.exports = Estado_Brigada;
