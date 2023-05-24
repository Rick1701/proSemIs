"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const IncidenteService = require("../services/incidente.service");
const { handleError } = require("../utils/errorHandler");

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

async function createIncidente(req, res) {
  try {
    const { inc_descripcion, inc_brigadista, inc_uaerea, inc_uterrestre } = req.body;
    const nuevoIncidente = await IncidenteService.createIncidente(
      inc_descripcion,
      inc_brigadista,
      inc_uaerea,
      inc_uterrestre
    );
    nuevoIncidente === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validación de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoIncidente);
  } catch (error) {
    handleError(error, "incidente.controller -> createIncidente");
    respondError(req, res, 500, "No se pudo crear el incidente");
  }
}

async function getIncidenteById(req, res) {
  try {
    const { id } = req.params;

    const incidente = await IncidenteService.getIncidenteById(id);
    incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el incidente solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, incidente);
  } catch (error) {
    handleError(error, "incidente.controller -> getIncidenteById");
    respondError(req, res, 500, "No se pudo obtener el incidente");
  }
}

async function updateIncidente(req, res) {
  try {
    const { id } = req.params;
    const incidente = await IncidenteService.updateIncidente(id, req.body);
    incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el incidente solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, incidente);
  } catch (error) {
    handleError(error, "incidente.controller -> updateIncidente");
    respondError(req, res, 500, "No se pudo actualizar el incidente");
  }
}

async function deleteIncidente(req, res) {
  try {
    const { id } = req.params;
    const incidente = await IncidenteService.deleteIncidente(id);
    incidente === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el incidente solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, { message: "Incidente eliminado correctamente" });
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
