"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'estado_base'
const estado_baseSchema = new mongoose.Schema({
  estabs_descripcion: {
    type: String,
    required: true,
  },

});

// Crea el modelo de datos 'Estado_Base' a partir del esquema 'estado_baseSchema'
const Estado_Base = mongoose.model("Estado_Base", estado_baseSchema);

// Exporta el modelo de datos 'Estado_Base'
module.exports = Estado_Base;
