"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const BrigadaService = require("../services/brigada.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getBrigadas
 * @description Obtiene todas las brigadas
 * @param req {Request}
 * @param res {Response}
 */
async function getBrigadas(req, res) {
  try {
    const brigadas = await BrigadaService.getBrigadas();
    brigadas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, brigadas);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createBrigada
 * @description Crea una nueva brigada
 * @param req {Request}
 * @param res {Response}
 */
async function createBrigada(req, res) {
  try {
    const nuevoBrigada = await BrigadaService.createBrigada(req.body);
    nuevoBrigada === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoBrigada);
  } catch (error) {
    handleError(error, "brigada.controller -> createBrigada");
    respondError(req, res, 500, "No se pudo crear la brigada");
  }
}

/**
 * @name getBrigadaById
 * @description Obtiene una brigada por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getBrigadaById(req, res) {
  try {
    const { id } = req.params;

    const brigada = await BrigadaService.getBrigadaById(id);
    brigada === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la brigada solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, brigada);
  } catch (error) {
    handleError(error, "brigada.controller -> getBrigadaById");
    respondError(req, res, 500, "No se pudo obtener la brigada");
  }
}

/**
 * @name updateBrigada
 * @description Actualiza una brigada por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateBrigada(req, res) {
  try {
    const { id } = req.params;
    const brigada = await BrigadaService.updateBrigada(id, req.body);
    brigada === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la brigada solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, brigada);
  } catch (error) {
    handleError(error, "brigada.controller -> updateBrigada");
    respondError(req, res, 500, "No se pudo actualizar la brigada");
  }
}

/**
 * @name deleteBrigada
 * @description Elimina una brigada por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteBrigada(req, res) {
  try {
    const { id } = req.params;
    const brigada = await BrigadaService.deleteBrigada(id);
    brigada === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la brigada solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, brigada);
  } catch (error) {
    handleError(error, "brigada.controller -> deleteBrigada");
    respondError(req, res, 500, "No se pudo eliminar la brigada");
  }
}

module.exports = {
  getBrigadas,
  createBrigada,
  getBrigadaById,
  updateBrigada,
  deleteBrigada,
};
