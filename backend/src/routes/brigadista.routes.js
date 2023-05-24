// EN ESTE MOMENTO ESTAS EN api/brigadista/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de brigadistas
const brigadistaController = require("../controllers/brigadista.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los brigadistas
router.get("/", brigadistaController.getBrigadistas);
router.post("/" /*, authoMiddleware.isAdmin,*/, brigadistaController.createBrigadista);
router.get("/:id", brigadistaController.getBrigadistaById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, brigadistaController.updateBrigadista);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, brigadistaController.deleteBrigadista);

// Exporta el enrutador
module.exports = router;
