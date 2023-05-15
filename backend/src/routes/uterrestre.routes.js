// EN ESTE MOMENTO ESTAS EN api/uterrestre/

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de usuarios
const uterrestreController = require("../controllers/uterrestre.controller.js");
// Importa el middleware de autorización
// const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios
router.get("/", uterrestreController.getUterrestres);
router.post("/" /*, authoMiddleware.isAdmin,*/, uterrestreController.createUterrestre);
router.get("/:id", uterrestreController.getUterrestreById);
router.put("/:id" /*, authoMiddleware.isAdmin,*/, uterrestreController.updateUterrestre);
router.delete("/:id"/*, authoMiddleware.isAdmin,*/, uterrestreController.deleteUterrestre);

// Exporta el enrutador
module.exports = router;
