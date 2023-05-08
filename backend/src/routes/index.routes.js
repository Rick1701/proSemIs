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
// Importa el enrutador de ubicacion
const ubicacionRoutes = require("./ubicacion.routes.js");
// Importa el enrutador de region
const regionRoutes = require("./region.routes.js");
// Importa el enrutador de estado_brigadista
const estado_brigadistaRoutes = require("./estado_brigadista.routes.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authMiddleware.verifyToken, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los siniestros /api/siniestro
router.use("/siniestro", siniestroRoutes);
// Define las rutas para las ubicaciones /api/ubicacion
router.use("/ubicacion", ubicacionRoutes);
// Define las rutas para las regiones /api/region
router.use("/region", regionRoutes);
// Define las rutas para los estado_brigadista /api/estado_brigadista
router.use("/estado_brigadista", estado_brigadistaRoutes);

// Exporta el enrutador
module.exports = router;
