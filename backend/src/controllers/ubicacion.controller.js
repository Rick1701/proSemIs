"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const UbicacionService = require("../services/ubicacion.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getUbicaciones
 * @description Obtiene todas las ubicaciones
 * @param req {Request}
 * @param res {Response}
 */
async function getUbicaciones(req, res) {
  try {
    const ubicaciones = await UbicacionService.getUbicaciones();
    ubicaciones.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, ubicaciones);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createUbicacion
 * @description Crea una nueva ubicacion
 * @param req {Request}
 * @param res {Response}
 */
async function createUbicacion(req, res) {
  try {
    const nuevaUbicacion = await UbicacionService.createUbicacion(req.body);
    nuevaUbicacion === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevaUbicacion);
  } catch (error) {
    handleError(error, "ubicacion.controller -> createUbicacion");
    respondError(req, res, 500, "No se pudo crear la Ubicacion");
  }
}

/**
 * @name getUbicacionById
 * @description Obtiene una Ubicacion por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getUbicacionById(req, res) {
  try {
    const { id } = req.params;

    const ubicacion = await UbicacionService.getUbicacionById(id);
    ubicacion === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la ubicacion solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, ubicacion);
  } catch (error) {
    handleError(error, "ubicacion.controller -> getUbicacionById");
    respondError(req, res, 500, "No se pudo obtener la ubicacion");
  }
}

/**
 * @name updateUbicacion
 * @description Actualiza la ubicacion por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateUbicacion(req, res) {
  try {
    const { id } = req.params;
    const ubicacion = await UbicacionService.updateUbicacion(id, req.body);
    ubicacion === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la ubicacion solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, ubicacion);
  } catch (error) {
    handleError(error, "ubicacion.controller -> updateUbicacion");
    respondError(req, res, 500, "No se pudo actualizar la ubicacion");
  }
}

/**
 * @name deleteUbicacion
 * @description Elimina una ubicacion por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteUbicacion(req, res) {
  try {
    const { id } = req.params;
    const ubicacion = await UbicacionService.deleteUbicacion(id);
    ubicacion === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la ubicacion solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, ubicacion);
  } catch (error) {
    handleError(error, "ubicacion.controller -> deleteUbicacion");
    respondError(req, res, 500, "No se pudo eliminar la ubicacion");
  }
}

module.exports = {
  getUbicaciones,
  createUbicacion,
  getUbicacionById,
  updateUbicacion,
  deleteUbicacion,
};
