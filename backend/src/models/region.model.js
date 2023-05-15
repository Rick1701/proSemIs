"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'region'
const regionSchema = new mongoose.Schema({
  reg_descripcion: {
    type: String,
    required: true,
  },

});

// Crea el modelo de datos 'Region' a partir del esquema 'regionSchema'
const Region = mongoose.model("Region", regionSchema);

// Exporta el modelo de datos 'Region'
module.exports = Region;
