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
router.post("/" /*, authoMiddleware.isAdmin,*/, estado_brigadaController.createEstado_Brigadista);
router.get("/:id", estado_brigadaController.getEstado_BrigadistaById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, estado_brigadaController.updateEstado_Brigadista);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, estado_brigadaController.deleteEstado_Brigadista);

// Exporta el enrutador
module.exports = router;
