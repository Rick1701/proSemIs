"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'categorias'
const categoriaSchema = new mongoose.Schema({
    cat_descripcion:{
    type: String,
    required: true,
  }
});

// Crea el modelo de datos 'Categoria' a partir del esquema 'categoriaSchema'
const Categoria = mongoose.model("Categoria", categoriaSchema);

// Exporta el modelo de datos 'Categoria'
module.exports = Categoria;
