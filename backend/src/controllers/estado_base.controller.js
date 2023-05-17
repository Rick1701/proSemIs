"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const Estado_BaseService = require("../services/estado_base.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getEstados_Bases
 * @description Obtiene todos los estados_bases
 * @param req {Request}
 * @param res {Response}
 */
async function getEstados_Bases(req, res) {
  try {
    const estados_bases = await Estado_BaseService.getEstados_Bases();
    estados_bases.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, estados_bases);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createEstado_Base
 * @description Crea un nuevo estado_base
 * @param req {Request}
 * @param res {Response}
 */
async function createEstado_Base(req, res) {
  try {
    const nuevaEstado_Base = await Estado_BaseService.createEstado_Base(req.body);
    nuevaEstado_Base === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevaEstado_Base);
  } catch (error) {
    handleError(error, "estado_base.controller -> createEstado_Base");
    respondError(req, res, 500, "No se pudo crear un Estado_Base");
  }
}

/**
 * @name getEstado_BaseById
 * @description Obtiene un Estado_Base por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getEstado_BaseById(req, res) {
  try {
    const { id } = req.params;

    const estado_base = await Estado_BaseService.getEstado_BaseById(id);
    estado_base === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_base solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_base);
  } catch (error) {
    handleError(error, "estado_base.controller -> getEstado_BaseById");
    respondError(req, res, 500, "No se pudo obtener el estado_base");
  }
}

/**
 * @name updateEstado_Base
 * @description Actualiza el estado_base por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateEstado_Base(req, res) {
  try {
    const { id } = req.params;
    const estado_base = await Estado_BaseService.updateEstado_Base(id, req.body);
    estado_base === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_base solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_base);
  } catch (error) {
    handleError(error, "estado_base.controller -> updateEstado_Base");
    respondError(req, res, 500, "No se pudo actualizar el estado_base");
  }
}

/**
 * @name deleteEstado_Base
 * @description Elimina una estado_base por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteEstado_Base(req, res) {
  try {
    const { id } = req.params;
    const estado_base = await Estado_BaseService.deleteEstado_Base(id);
    estado_base === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el estado_base solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_base);
  } catch (error) {
    handleError(error, "estado_base.controller -> deleteEstado_Base");
    respondError(req, res, 500, "No se pudo eliminar el estado_base");
  }
}

module.exports = {
  getEstados_Bases,
  createEstado_Base,
  getEstado_BaseById,
  updateEstado_Base,
  deleteEstado_Base,
};