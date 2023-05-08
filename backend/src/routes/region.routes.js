// EN ESTE MOMENTO ESTAS EN api/region/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de region
const regionController = require("../controllers/region.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las regiones
router.get("/", regionController.getRegiones);
router.post("/" /*, authoMiddleware.isAdmin,*/, regionController.createRegion);
router.get("/:id", regionController.getRegionById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, regionController.updateRegion);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, regionController.deleteRegion);

// Exporta el enrutador
module.exports = router;
