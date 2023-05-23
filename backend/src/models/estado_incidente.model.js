"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la incidente de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'estado_incidente'
const estado_incidenteSchema = new mongoose.Schema({
  est_inc_descripcion: {
    type: String,
    required: true,
    enum: ["En proceso", "Solucionado"]
  },
  est_inc_incidente: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Incidente",
    required: true,
  }]
});

// Crea el modelo de datos 'Estado_Incidente' a partir del esquema 'estado_incidenteSchema'
const Estado_Incidente = mongoose.model("Estado_Incidente", estado_incidenteSchema);

// Exporta el modelo de datos 'Estado_Incidente'
module.exports = Estado_Incidente;
