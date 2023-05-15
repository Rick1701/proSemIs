"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const UterrestreService = require("../services/uterrestre.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getUterrestres
 * @description Obtiene todas las Uterrestres
 * @param req {Request}
 * @param res {Response}
 */
async function getUterrestres(req, res) {
  try {
    const uterrestres = await UterrestreService.getUterrestres();
    uterrestres.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, uterrestres);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createUterrestre
 * @description Crea un nueva uterrestre
 * @param req {Request}
 * @param res {Response}
 */
async function createUterrestre(req, res) {
  try {
    const nuevoUterrestre = await UterrestreService.createUterrestre(req.body);
    nuevoUterrestre === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoUterrestre);
  } catch (error) {
    handleError(error, "uterrestre.controller -> createUterrestre");
    respondError(req, res, 500, "No se pudo crear el uterrestre");
  }
}

/**
 * @name getUterrestreById
 * @description Obtiene una uterrestre por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getUterrestreById(req, res) {
  try {
    const { id } = req.params;

    const uterrestre = await UterrestreService.getUterrestreById(id);
    uterrestre === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la Uterrestre solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, uterrestre);
  } catch (error) {
    handleError(error, "uterrestre.controller -> getUterrestreById");
    respondError(req, res, 500, "No se pudo obtener la uterrestre");
  }
}

/**
 * @name updateUterrestre
 * @description Actualiza una Uterrestre por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateUterrestre(req, res) {
  try {
    const { id } = req.params;
    const uterrestre = await UterrestreService.updateUterrestre(id, req.body);
    uterrestre === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la Uterrestre solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, base);
  } catch (error) {
    handleError(error, "uterrestre.controller -> updateUterrestre");
    respondError(req, res, 500, "No se pudo actualizar la uterrestre");
  }
}

/**
 * @name deleteUterrestre
 * @description Elimina una uterrestre por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteUterrestre(req, res) {
  try {
    const { id } = req.params;
    const uterrestre = await UterrestreService.deleteUterrestre(id);
    uterrestre === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la uterrestre solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, uterrestre);
  } catch (error) {
    handleError(error, "uterrestre.controller -> deleteUterrestre");
    respondError(req, res, 500, "No se pudo eliminar la uterrestre");
  }
}

module.exports = {
  getUterrestres,
  createUterrestre,
  getUterrestreById,
  updateUterrestre,
  deleteUterrestre,
};
