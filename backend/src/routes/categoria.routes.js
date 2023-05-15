// EN ESTE MOMENTO ESTAS EN api/categoria/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de categoria
const categoriaController = require("../controllers/categoria.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las categorias 
router.get("/", categoriaController.getCategorias);
router.post("/" /*, authoMiddleware.isAdmin,*/, categoriaController.createCategoria);
router.get("/:id", categoriaController.getCategoriaById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, categoriaController.updateCategoria);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, categoriaController.deleteCategoria);

// Exporta el enrutador
module.exports = router;
