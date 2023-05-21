"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'estado_brigadista'
const estado_brigadistaSchema = new mongoose.Schema({
  estab_descripcion: {
    type: String,
    required: true,
    enum :["Disponible","No Disponible"],
  },
  estab_brigadista: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: true,
  }],

});

// Crea el modelo de datos 'Estado_Brigadista' a partir del esquema 'estado_brigadistaSchema'
const Estado_Brigadista = mongoose.model("Estado_Brigadista", estado_brigadistaSchema);

// Exporta el modelo de datos 'Estado_Brigadista'
module.exports = Estado_Brigadista;
