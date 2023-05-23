// EN ESTE MOMENTO ESTAS EN api/siniestro/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de usuarios
const siniestroController = require("../controllers/siniestro.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios
router.get("/", siniestroController.getSiniestros);
router.post("/" /*, authoMiddleware.isAdmin,*/, siniestroController.createSiniestro);
router.get("/:id", siniestroController.getSiniestroById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, siniestroController.updateSiniestro);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, siniestroController.deleteSiniestro);
// Define la ruta para el método estadistica
router.get("/estadisticasiniestro/:id", siniestroController.getEstadisticaSiniestroById);
//router.get("/estadisticasiniestro", siniestroController.getEstadisticaSiniestros);
//router.get("/estadisticacopa/:id", siniestroController.getEstadisticaCopaById);

// Define ruta para la estrategia
router.get("/estrategia/:id", siniestroController.getEstrategiaSiniestroById);
// Exporta el enrutador
module.exports = router;
