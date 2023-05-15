// EN ESTE MOMENTO ESTAS EN api/brigada/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de brigadas
const brigadaController = require("../controllers/brigada.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las brigadas
router.get("/", brigadaController.getBrigadas);
router.post("/" /*, authoMiddleware.isAdmin,*/, brigadaController.createBrigada);
router.get("/:id", brigadaController.getBrigadaById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, brigadaController.updateBrigada);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, brigadaController.deleteBrigada);

// Exporta el enrutador
module.exports = router;
