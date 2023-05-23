"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'incidentes'
const incidenteSchema = new mongoose.Schema({
  inc_descripcion:{
    type: String,
    required: true,
  },
  inc_estado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado_Incidente",
    required: true,
  },
  inc_brigadista: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  }],
  inc_uaerea: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Uaerea",
    required: false,
  }],
  inc_uterrestre: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Uterrestre",
    required: false,
  }],
  inc_siniestro:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Siniestro",
    required: false,
  }
});

// Crea el modelo de datos 'Incidente' a partir del esquema 'incidenteSchema'
const Incidente = mongoose.model("Incidente", incidenteSchema);

// Exporta el modelo de datos 'Incidente'
module.exports = Incidente;
