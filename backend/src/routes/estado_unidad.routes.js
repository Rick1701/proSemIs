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
router.get("/", estado_unidadController.getEstado_Unidades);
router.post("/" /*, authoMiddleware.isAdmin,*/, estado_unidadController.createEstado_Unidad);
router.get("/:id", estado_unidadController.getEstado_UnidadById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, estado_unidadController.updateEstado_Unidad);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, estado_unidadController.deleteEstado_Unidad);

// Exporta el enrutador
module.exports = router;
