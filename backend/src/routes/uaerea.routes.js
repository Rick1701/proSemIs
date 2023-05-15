// EN ESTE MOMENTO ESTAS EN api/uaerea/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de usuarios
const uaereaController = require("../controllers/uaerea.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios
router.get("/", uaereaController.getUaereas);
router.post("/" /*, authoMiddleware.isAdmin,*/, uaereaController.createUaerea);
router.get("/:id", uaereaController.getUaereaById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, uaereaController.updateUaerea);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, uaereaController.deleteUaerea);

// Exporta el enrutador
module.exports = router;
