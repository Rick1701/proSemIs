"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
// Crea el esquema de la coleccion 'categorias'
const categoriaSchema = new mongoose.Schema({
    cat_nivel:{
    type: Number,
    required: true,
  },
  cat_incendio: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Siniestro",
    required: true,
    /*validate: {
      validator: function(value) {
        // Verificar que el array no tenga valores repetidos
        return new Set(value).size === value.length;
      },
      message: "Valores repetidos no permitidos en {PATH}",
    },*/
  }],
});

// Crea el modelo de datos 'Categoria' a partir del esquema 'categoriaSchema'
const Categoria = mongoose.model("Categoria", categoriaSchema);

// Exporta el modelo de datos 'Categoria'
module.exports = Categoria;
