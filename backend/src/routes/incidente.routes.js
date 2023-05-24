// EN ESTE MOMENTO ESTAS EN api/incidente/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de incidentes
const incidenteController = require("../controllers/incidente.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los incidentes
router.get("/", incidenteController.getIncidentes);
router.post("/" /*, authoMiddleware.isAdmin,*/, incidenteController.createIncidente);
router.get("/:id", incidenteController.getIncidenteById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, incidenteController.updateIncidente);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, incidenteController.deleteIncidente);

// Exporta el enrutador
module.exports = router;
