"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const UaereaService = require("../services/uaerea.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getUaereas
 * @description Obtiene todas las Uaereas
 * @param req {Request}
 * @param res {Response}
 */
async function getUaereas(req, res) {
  try {
    const uaereas = await UaereaService.getUaereas();
    uaereas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, uaereas);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createUaerea
 * @description Crea un nueva uaerea
 * @param req {Request}
 * @param res {Response}
 */
async function createUaerea(req, res) {
  try {
    const nuevoUaerea = await UaereaService.createUaerea(req.body);
    nuevoUaerea === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoUaerea);
  } catch (error) {
    handleError(error, "uaerea.controller -> createUaerea");
    respondError(req, res, 500, "No se pudo crear el uaerea");
  }
}

/**
 * @name getUaereaById
 * @description Obtiene una uaerea por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getUaereaById(req, res) {
  try {
    const { id } = req.params;

    const uaerea = await UaereaService.getUaereaById(id);
    uaerea === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la Uaerea solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, uaerea);
  } catch (error) {
    handleError(error, "uaerea.controller -> getUaereaById");
    respondError(req, res, 500, "No se pudo obtener la uaerea");
  }
}

/**
 * @name updateUaerea
 * @description Actualiza una Uaerea por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateUaerea(req, res) {
  try {
    const { id } = req.params;
    const uaerea = await UaereaService.updateUaerea(id, req.body);
    uaerea === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la Uaerea solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, base);
  } catch (error) {
    handleError(error, "uaerea.controller -> updateUaerea");
    respondError(req, res, 500, "No se pudo actualizar la uaerea");
  }
}

/**
 * @name deleteUaerea
 * @description Elimina una uaerea por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteUaerea(req, res) {
  try {
    const { id } = req.params;
    const uaerea = await UaereaService.deleteUaerea(id);
    uaerea === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la uaerea solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, uaerea);
  } catch (error) {
    handleError(error, "uaerea.controller -> deleteUaerea");
    respondError(req, res, 500, "No se pudo eliminar la uaerea");
  }
}

module.exports = {
  getUaereas,
  createUaerea,
  getUaereaById,
  updateUaerea,
  deleteUaerea,
};
