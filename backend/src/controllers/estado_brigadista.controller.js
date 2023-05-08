"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const Estado_BrigadistaService = require("../services/estado_brigadista.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getEstados_Brigadistas
 * @description Obtiene todos los estados_brigadistas
 * @param req {Request}
 * @param res {Response}
 */
async function getEstados_Brigadistas(req, res) {
  try {
    const estados_brigadistas = await Estado_BrigadistaService.getEstados_Brigadistas();
    estados_brigadistas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, estados_brigadistas);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createEstado_Brigadista
 * @description Crea un nuevo estado_brigadista
 * @param req {Request}
 * @param res {Response}
 */
async function createEstado_Brigadista(req, res) {
  try {
    const nuevaEstado_Brigadista = await Estado_BrigadistaService.createEstado_Brigadista(req.body);
    nuevaEstado_Brigadista === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevaEstado_Brigadista);
  } catch (error) {
    handleError(error, "estado_brigadista.controller -> createEstado_Brigadista");
    respondError(req, res, 500, "No se pudo crear un Estado_Brigadista");
  }
}

/**
 * @name getEstado_BrigadistaById
 * @description Obtiene un Estado_Brigadista por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getEstado_BrigadistaById(req, res) {
  try {
    const { id } = req.params;

    const estado_brigadista = await Estado_BrigadistaService.getEstado_BrigadistaById(id);
    estado_brigadista === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_brigadista solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_brigadista);
  } catch (error) {
    handleError(error, "estado_brigadista.controller -> getEstado_BrigadistaById");
    respondError(req, res, 500, "No se pudo obtener el estado_brigadista");
  }
}

/**
 * @name updateEstado_Brigadista
 * @description Actualiza el estado_brigadista por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateEstado_Brigadista(req, res) {
  try {
    const { id } = req.params;
    const estado_brigadista = await Estado_BrigadistaService.updateEstado_Brigadista(id, req.body);
    estado_brigadista === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_brigadista solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_brigadista);
  } catch (error) {
    handleError(error, "estado_brigadista.controller -> updateEstado_Brigadista");
    respondError(req, res, 500, "No se pudo actualizar el estado_brigadista");
  }
}

/**
 * @name deleteEstado_Brigadista
 * @description Elimina una estado_brigadista por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteEstado_Brigadista(req, res) {
  try {
    const { id } = req.params;
    const estado_brigadista = await Estado_BrigadistaService.deleteEstado_Brigadista(id);
    estado_brigadista === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_brigadista solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_brigadista);
  } catch (error) {
    handleError(error, "estado_brigadista.controller -> deleteEstado_Brigadista");
    respondError(req, res, 500, "No se pudo eliminar el estado_brigadista");
  }
}

module.exports = {
  getEstados_Brigadistas,
  createEstado_Brigadista,
  getEstado_BrigadistaById,
  updateEstado_Brigadista,
  deleteEstado_Brigadista,
};