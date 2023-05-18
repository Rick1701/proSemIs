"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const Estado_IncidenteService = require("../services/estado_incidente.service");
const { handleError } = require("../utils/errorHandler");

async function getEstados_Incidentes(req, res) {
  try {
    const estados_incidentes = await Estado_IncidenteService.getEstados_Incidentes();
    estados_incidentes.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, estados_incidentes);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

async function createEstado_Incidente(req, res) {
  try {
    const nuevoEstado_Incidente = await Estado_IncidenteService.createEstado_Incidente(req.body);
    nuevoEstado_Incidente === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoEstado_Incidente);
  } catch (error) {
    handleError(error, "estado_incidente.controller -> createEstado_Incidente");
    respondError(req, res, 500, "No se pudo crear el Estado_incidente");
  }
}

async function getEstado_IncidenteById(req, res) {
  try {
    const { id } = req.params;

    const estado_incidente = await Estado_IncidenteService.getEstado_IncidenteById(id);
    estado_incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el Estado_incidente solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_incidente);
  } catch (error) {
    handleError(error, "estado_incidente.controller -> getEstado_IncidenteById");
    respondError(req, res, 500, "No se pudo obtener el estado_incidente");
  }
}

async function updateEstado_Incidente(req, res) {
  try {
    const { id } = req.params;
    const estado_incidente = await Estado_IncidenteService.updateEstado_Incidente(id, req.body);
    estado_incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el Estado_incidente solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_incidente);
  } catch (error) {
    handleError(error, "estado_incidente.controller -> updateEstado_Incidente");
    respondError(req, res, 500, "No se pudo actualizar el estado_incidente");
  }
}

async function deleteEstado_Incidente(req, res) {
  try {
    const { id } = req.params;
    const estado_incidente = await Estado_IncidenteService.deleteEstado_Incidente(id);
    estado_incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el Estado_incidente solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_incidente);
  } catch (error){
    handleError(error, "estado_incidente.controller -> deleteEstado_Incidente");
    respondError(req, res, 500, "No se pudo eliminar el Estado_incidente");
  }
}
module.exports = {
  getEstados_Incidentes,
  createEstado_Incidente,
  getEstado_IncidenteById,
  updateEstado_Incidente,
  deleteEstado_Incidente,
};