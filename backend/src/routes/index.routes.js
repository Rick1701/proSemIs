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
// Importa el enrutador de incidente
const incidenteRoutes = require("./incidente.routes.js");
// Importa el enrutador de la categoria
const categoriaRoutes = require("./categoria.routes.js");
// Importa el enrutador de ubicacion
const ubicacionRoutes = require("./ubicacion.routes.js");
// Importa el enrutador de region
const regionRoutes = require("./region.routes.js");
// Importa el enrutador de estado_brigadista
const estado_brigadistaRoutes = require("./estado_brigadista.routes.js");




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
// Define las rutas para las brigadas /api/brigada
router.use("/brigada", brigadaRoutes);
// Define las rutas para los brigadistas /api/brigadista
router.use("/brigadista", brigadistaRoutes);
// Define las rutas para las capacitaciones /api/capacitacion
router.use("/capacitacion", capacitacionRoutes);
// Define las rutas para los siniestros /api/incidente
router.use("/incidente", incidenteRoutes);
// Define las rutas para las categorias /api/categoria
router.use("/categoria", categoriaRoutes);
// Define las rutas para las ubicaciones /api/ubicacion
router.use("/ubicacion", ubicacionRoutes);
// Define las rutas para las regiones /api/region
router.use("/region", regionRoutes);
// Define las rutas para los estado_brigadista /api/estado_brigadista
router.use("/estado_brigadista", estado_brigadistaRoutes);



router.use("/base",baseRoutes);
router.use("/estado_unidad", estado_unidadRoutes);
router.use("/uaerea",uaereaRoutes);
router.use("/uterrestre",uterrestreRoutes);




// Exporta el enrutador
module.exports = router;
