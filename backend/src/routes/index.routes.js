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
// Importa el enrutador de brigada
const brigadaRoutes = require("./brigada.routes.js");
// Importa el enrutador de brigadista
const brigadistaRoutes = require("./brigadista.routes.js");
// Importa el enrutador de capacitacion
const capacitacionRoutes = require("./capacitacion.routes.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authMiddleware.verifyToken, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los siniestros /api/siniestro
router.use("/siniestro", siniestroRoutes);
// Define las rutas para las brigadas /api/brigada
router.use("/brigada", brigadaRoutes);
// Define las rutas para los brigadistas /api/brigadista
router.use("/brigadista", brigadistaRoutes);
// Define las rutas para las capacitaciones /api/capacitacion
router.use("/capacitacion", capacitacionRoutes);
// Exporta el enrutador
module.exports = router;
