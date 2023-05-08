// EN ESTE MOMENTO ESTAS EN api/estado_brigadista/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de estado_brigadista
const estado_brigadistaController = require("../controllers/estado_brigadista.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las estado_brigadistaes
router.get("/", estado_brigadistaController.getEstados_Brigadistas);
router.post("/" /*, authoMiddleware.isAdmin,*/, estado_brigadistaController.createEstado_Brigadista);
router.get("/:id", estado_brigadistaController.getEstado_BrigadistaById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, estado_brigadistaController.updateEstado_Brigadista);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, estado_brigadistaController.deleteEstado_Brigadista);

// Exporta el enrutador
module.exports = router;
