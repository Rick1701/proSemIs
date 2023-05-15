// EN ESTE MOMENTO ESTAS EN api/ubicacion/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de ubicacion
const ubicacionController = require("../controllers/ubicacion.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las ubicaciones
router.get("/", ubicacionController.getUbicaciones);
router.post("/" /*, authoMiddleware.isAdmin,*/, ubicacionController.createUbicacion);
router.get("/:id", ubicacionController.getUbicacionById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, ubicacionController.updateUbicacion);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, ubicacionController.deleteUbicacion);

// Exporta el enrutador
module.exports = router;
