"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const Estado_BrigadaService = require("../services/estado_brigada.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getEstados_Brigadas
 * @description Obtiene todos los estados_brigada
 * @param req {Request}
 * @param res {Response}
 */
async function getEstados_Brigadas(req, res) {
  try {
    const estados_brigada = await Estado_BrigadaService.getEstados_Brigadas();
    estados_brigada.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, estados_brigada);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createEstado_Brigada
 * @description Crea un nuevo estado_brigada
 * @param req {Request}
 * @param res {Response}
 */
async function createEstado_Brigada(req, res) {
  try {
    const nuevaEstado_Brigada = await Estado_BrigadaService.createEstado_Brigada(req.body);
    nuevaEstado_Brigada === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevaEstado_Brigada);
  } catch (error) {
    handleError(error, "estado_brigada.controller -> createEstado_Brigada");
    respondError(req, res, 500, "No se pudo crear un Estado_Brigada");
  }
}

/**
 * @name getEstado_BrigadaById
 * @description Obtiene un Estado_Brigada por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getEstado_BrigadaById(req, res) {
  try {
    const { id } = req.params;

    const estado_brigada = await Estado_BrigadaService.getEstado_BrigadaById(id);
    estado_brigada === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_brigada solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_brigada);
  } catch (error) {
    handleError(error, "estado_brigada.controller -> getEstado_BrigadaById");
    respondError(req, res, 500, "No se pudo obtener el estado_brigada");
  }
}

/**
 * @name updateEstado_Brigada
 * @description Actualiza el estado_brigada por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateEstado_Brigada(req, res) {
  try {
    const { id } = req.params;
    const estado_brigada = await Estado_BrigadaService.updateEstado_Brigada(id, req.body);
    estado_brigada === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_brigada solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_brigada);
  } catch (error) {
    handleError(error, "estado_brigada.controller -> updateEstado_Brigada");
    respondError(req, res, 500, "No se pudo actualizar el estado_brigada");
  }
}

/**
 * @name deleteEstado_Brigada
 * @description Elimina una estado_brigada por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteEstado_Brigada(req, res) {
  try {
    const { id } = req.params;
    const estado_brigada = await Estado_BrigadaService.deleteEstado_Brigada(id);
    estado_brigada === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_brigada solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_brigada);
  } catch (error) {
    handleError(error, "estado_brigada.controller -> deleteEstado_Brigada");
    respondError(req, res, 500, "No se pudo eliminar el estado_brigada");
  }
}

module.exports = {
  getEstados_Brigadas,
  createEstado_Brigada,
  getEstado_BrigadaById,
  updateEstado_Brigada,
  deleteEstado_Brigada,
};