// EN ESTE MOMENTO ESTAS EN api/capacitacion/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de capacitaciones
const capacitacionController = require("../controllers/capacitacion.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las capacitaciones
router.get("/", capacitacionController.getCapacitaciones);
router.post("/" /*, authoMiddleware.isAdmin,*/, capacitacionController.createCapacitacion);
router.get("/:id", capacitacionController.getCapacitacionById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, capacitacionController.updateCapacitacion);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, capacitacionController.deleteCapacitacion);

// Exporta el enrutador
module.exports = router;
