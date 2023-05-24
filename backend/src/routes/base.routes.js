// EN ESTE MOMENTO ESTAS EN api/base/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de usuarios
const baseController = require("../controllers/base.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios
router.get("/", baseController.getBases);
router.post("/" /*, authoMiddleware.isAdmin,*/, baseController.createBase);
router.get("/:id", baseController.getBaseById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, baseController.updateBase);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, baseController.deleteBase);
router.get("/estadisticabase/:id", baseController.getEstadisticaBaseById);
router.get("/asignarbase/:baseId/:incendioId", baseController.asignarBaseAIncendioController);

// Exporta el enrutador
module.exports = router;
