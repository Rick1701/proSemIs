// EN ESTE MOMENTO ESTAS EN api/estado_incidente/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de estado_incidente
const estado_incidenteController = require("../controllers/estado_incidente.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las estado_incidentees
router.get("/", estado_incidenteController.getEstados_Incidentes);
router.post("/" /*, authoMiddleware.isAdmin,*/, estado_incidenteController.createEstado_Incidente);
router.get("/:id", estado_incidenteController.getEstado_IncidenteById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, estado_incidenteController.updateEstado_Incidente);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, estado_incidenteController.deleteEstado_Incidente);

// Exporta el enrutador
module.exports = router;
