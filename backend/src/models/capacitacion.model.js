"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'capacitacion'
const capacitacionSchema = new mongoose.Schema({
  cap_descripcion: {
    type: String,
    required: true,
  }
 ,
});

// Crea el modelo de datos 'Capacitacion' a partir del esquema 'capacitacionSchema'
const Capacitacion = mongoose.model("Capacitacion", capacitacionSchema);

// Exporta el modelo de datos 'Capacitacion'
module.exports = Capacitacion;
