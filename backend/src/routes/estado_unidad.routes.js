// EN ESTE MOMENTO ESTAS EN api/estado_unidad/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de usuarios
const estado_unidadController = require("../controllers/estado_unidad.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios
router.get("/", estado_unidadController.getEstado_unidades);
router.post("/" /*, authoMiddleware.isAdmin,*/, estado_unidadController.createEstado_unidad);
router.get("/:id", estado_unidadController.getEstado_unidadById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, estado_unidadController.updateEstado_unidad);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, estado_unidadController.deleteEstado_unidad);

// Exporta el enrutador
module.exports = router;
