// EN ESTE MOMENTO ESTAS EN api/estado_base/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de estado_base
const estado_baseController = require("../controllers/estado_base.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las estado_basees
router.get("/", estado_baseController.getEstados_Bases);
router.post("/" /*, authoMiddleware.isAdmin,*/, estado_baseController.createEstado_Base);
router.get("/:id", estado_baseController.getEstado_BaseById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, estado_baseController.updateEstado_Base);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, estado_baseController.deleteEstado_Base);

// Exporta el enrutador
module.exports = router;
