"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const RegionService = require("../services/region.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getRegiones
 * @description Obtiene todas las regiones
 * @param req {Request}
 * @param res {Response}
 */
async function getRegiones(req, res) {
  try {
    const regiones = await RegionService.getRegiones();
    regiones.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, regiones);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createRegion
 * @description Crea una nueva region
 * @param req {Request}
 * @param res {Response}
 */
async function createRegion(req, res) {
  try {
    const nuevaRegion = await RegionService.createRegion(req.body);
    nuevaRegion === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevaRegion);
  } catch (error) {
    handleError(error, "region.controller -> createRegion");
    respondError(req, res, 500, "No se pudo crear la Region");
  }
}

/**
 * @name getRegionById
 * @description Obtiene una Region por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getRegionById(req, res) {
  try {
    const { id } = req.params;

    const region = await RegionService.getRegionById(id);
    region === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la region solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, region);
  } catch (error) {
    handleError(error, "region.controller -> getRegionById");
    respondError(req, res, 500, "No se pudo obtener la region");
  }
}

/**
 * @name updateRegion
 * @description Actualiza la region por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateRegion(req, res) {
  try {
    const { id } = req.params;
    const region = await RegionService.updateRegion(id, req.body);
    region === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la region solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, region);
  } catch (error) {
    handleError(error, "region.controller -> updateRegion");
    respondError(req, res, 500, "No se pudo actualizar la region");
  }
}

/**
 * @name deleteRegion
 * @description Elimina una region por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteRegion(req, res) {
  try {
    const { id } = req.params;
    const region = await RegionService.deleteRegion(id);
    region === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la region solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, region);
  } catch (error) {
    handleError(error, "region.controller -> deleteRegion");
    respondError(req, res, 500, "No se pudo eliminar la region");
  }
}

module.exports = {
  getRegiones,
  createRegion,
  getRegionById,
  updateRegion,
  deleteRegion,
};
