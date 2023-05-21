"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const siniestroSchema = new mongoose.Schema({
  sin_velocidadViento: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        const velocidadViento = parseInt(value);
        return velocidadViento >= 0 && velocidadViento <=70;
      },
      message: "La velocidad del viento debe estar entre 0 y 70 nudos",
    }
  },
  sin_temperatura: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validar si la temperatura está dentro del rango
        const temperatura = parseInt(value);
        return temperatura >= 0 && temperatura <= 42;
      },
      message: "La temperatura debe estar entre 0 y 42 grados",
    },
  },
  sin_humedad: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        const humedad = parseInt(value);
        return humedad >= 10 && humedad <= 100;
      },
      message: "La humedad debe estar entre 10% y 100%",
    }
  },
  sin_fechaInicio: {
    type: Date,
    required: true,
  },
  sin_fechaTermino: {
    type: Date,
    required: true,
  },
  sin_latitud: {
    type: Number,
    required: true,
  },
  sin_superficie: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        const superficie = parseInt(value);
        return superficie >= 0 && superficie <= 1000000;
      },
      message: "La superficie debe estar entre 0 y 1000000",
    }
  },
  sin_distribucion_fuego: {
    type: String,
    required: true,
    enum: ["copas","superficie","subsuelo"],
  },
  sin_categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: false,
  },
});

// Crea el modelo de datos 'Siniestro' a partir del esquema 'siniestroSchema'
const Siniestro = mongoose.model("Siniestro", siniestroSchema);

// Exporta el modelo de datos 'Siniestro'
module.exports = Siniestro;
