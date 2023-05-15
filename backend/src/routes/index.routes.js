// AQUI ESTAMOS EN /api

"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el enrutador de usuarios
const userRoutes = require("./user.routes.js");
// Importa el enrutador de autenticación
const authRoutes = require("./auth.routes.js");
// Importa el middleware de autenticación
const authMiddleware = require("../middlewares/authe.middleware.js");
// Importa el enrutador de siniestro
const siniestroRoutes = require("./siniestro.routes.js");


const baseRoutes = require("./base.routes.js");

const estado_unidadRoutes = require("./estado_unidad.routes.js");

const uaereaRoutes = require("./uaerea.routes.js");

const uterrestreRoutes = require("./uterrestre.routes.js");



// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authMiddleware.verifyToken, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los siniestros /api/siniestro
router.use("/siniestro", siniestroRoutes);

router.use("/base",baseRoutes);
router.use("/estado_unidad", estado_unidadRoutes);
router.use("/uaerea",uaereaRoutes);
router.use("/uterrestre",uterrestreRoutes);




// Exporta el enrutador
module.exports = router;
