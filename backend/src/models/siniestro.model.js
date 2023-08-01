"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'siniestros'
const siniestroSchema = new mongoose.Schema({
  sin_numeroIncendio: {
    type: Number,
    required: false,
    unique: true,
  },
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
    required: true,/*
    validate: {
      validator: function(value) {
        return value <= this.sin_fechaTermino;
      },
      message: 'La fecha de inicio debe ser anterior a la fecha de termino.'
    }*/
  },
  sin_fechaTermino: {
    type: Date,
    required: false,
  },
  sin_latitud: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 17 && value <= 56;
      },
      message: 'La latitud debe estar entre 17 y 56.',
    },
  },
  sin_longitud: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value === 30;
      },
      message: 'La longitud debe ser igual a 30.',
    },
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
  type: [String],
  required: true,
  validate: {
    validator: function(value) {
      // Verificar que todos los valores estén permitidos
      const allowedValues = ["copas", "superficie", "subsuelo"];
      return value.every(val => allowedValues.includes(val));
    },
    message: 'Los valores de sin_distribucion_fuego deben ser "copas", "superficie" o "subsuelo".'
  }
},
  /*sin_tipo_bosque: {
    type: String,
    required: true,
    enum: ["monocultivo","nativo"],
    validate: {
      validator: function(value) {
        return ["monocultivo","nativo"].includes(value);
      },
      message: 'El valor de sin_tipo_bosque debe ser "monocultivo" o "nativo".'
    }
  },*/
  sin_categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: false,
  },
  sin_incidente: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incidente",
    required: false,
  }],
  sin_bases_operando: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Base",
    required: false,
  }],
  sin_estado : {
    type: String,
    required: false,
    enum: ["INICIACIÓN","PROPAGACIÓN","EXTINCIÓN"]
  },
  sin_estrategia : {
    type: String,
    required: false,
  },

  // Nuevo campo para almacenar los hitos
  hitos: [
    {
      fecha: {
        type: Date,
        default: Date.now,
      },
      descripcion: {
        type: String,
        required: true,
      },
      siniestroCompleto: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
      },
    },
  ],
});

// Antes de guardar un nuevo siniestro, se ejecuta esta función para incrementar sin_numeroIncendio si no existe
siniestroSchema.pre("save", async function (next) {
  const doc = this;
  try {
    if (!doc.sin_numeroIncendio) {
      const count = await mongoose.model("Siniestro").countDocuments();
      doc.sin_numeroIncendio = count + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Crea el modelo de datos 'Siniestro' a partir del esquema 'siniestroSchema'
const Siniestro = mongoose.model("Siniestro", siniestroSchema);

// Exporta el modelo de datos 'Siniestro'
module.exports = Siniestro;