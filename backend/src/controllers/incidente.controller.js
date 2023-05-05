"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const IncidenteService = require("../services/incidente.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getIncidentes
 * @description Obtiene todos los incidentes
 * @param res {Response}
 */
async function getIncidentes(req, res) {
  try {
    const incidentes = await IncidenteService.getIncidentes();
    incidentes.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, incidentes);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createIncidente
 * @description Crea un nuevo incidente
 * @param req {Request}
 * @param res {Response}
 */
async function createIncidente(req, res) {
  try {
    const nuevoIncidente = await IncidenteService.createIncidente(req.body);
    nuevoIncidente === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoIncidente);
  } catch (error) {
    handleError(error, "incidente.controller -> createIncidente");
    respondError(req, res, 500, "No se pudo crear el incidente");
  }
}

/**
 * @name getIncidenteById
 * @description Obtiene un incidente por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getIncidenteById(req, res) {
  try {
    const { id } = req.params;

    const incidente = await IncidenteService.getIncidenteById(id);
    incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el incidente solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, incidente);
  } catch (error) {
    handleError(error, "incidente.controller -> getIncidenteById");
    respondError(req, res, 500, "No se pudo obtener el incidente");
  }
}

/**
 * @name updateIncidente
 * @description Actualiza un incidente por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateIncidente(req, res) {
  try {
    const { id } = req.params;
    const incidente = await IncidenteService.updateIncidente(id, req.body);
    incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el incidente solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, incidente);
  } catch (error) {
    handleError(error, "incidente.controller -> updateIncidente");
    respondError(req, res, 500, "No se pudo actualizar el incidente");
  }
}

/**
 * @name deleteIncidente
 * @description Elimina un incidente por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteIncidente(req, res) {
  try {
    const { id } = req.params;
    const incidente = await IncidenteService.deleteIncidente(id);
    incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el incidente solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, incidente);
  } catch (error) {
    handleError(error, "incidente.controller -> deleteIncidente");
    respondError(req, res, 500, "No se pudo eliminar el incidente");
  }
}

module.exports = {
  getIncidentes,
  createIncidente,
  getIncidenteById,
  updateIncidente,
  deleteIncidente,
};
