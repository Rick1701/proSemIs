// EN ESTE MOMENTO ESTAS EN api/estado_brigada/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de estado_brigada
const estado_brigadaController = require("../controllers/estado_brigada.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las estado_brigadaes
router.get("/", estado_brigadaController.getEstados_Brigadas);
router.post("/", estado_brigadaController.createEstado_Brigada);
router.get("/:id", estado_brigadaController.getEstado_BrigadaById);
router.put("/:id", estado_brigadaController.updateEstado_Brigada);
router.delete("/:id", estado_brigadaController.deleteEstado_Brigada);

// Exporta el enrutador
module.exports = router;
