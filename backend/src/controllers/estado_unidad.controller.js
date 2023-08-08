"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const Estado_UnidadService = require("../services/estado_unidad.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getEstado_Unidades
 * @description Obtiene todos los Estado_Unidades
 * @param req {Request}
 * @param res {Response}
 */
async function getEstado_Unidades(req, res) {
  try {
    const Estado_Unidades = await Estado_unidadService.getEstado_Unidades();
    Estado_Unidades.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, Estado_Unidades);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createEstado_unidad
 * @description Crea un nuevo Estado_unidad
 * @param req {Request}
 * @param res {Response}
 */
async function createEstado_Unidad(req, res) {
  try {
    const nuevoEstado_Unidad = await Estado_UnidadService.createEstado_Unidad(req.body);
    nuevoEstado_Unidad === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoEstado_Unidad);
  } catch (error) {
    handleError(error, "estado_unidad.controller -> createEstado_unidad");
    respondError(req, res, 500, "No se pudo crear el Estado_unidad");
  }
}

/**
 * @name getEstado_unidadById
 * @description Obtiene un Estado_unidad por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getEstado_UnidadById(req, res) {
  try {
    const { id } = req.params;

    const estado_unidad = await Estado_unidadService.getEstado_unidadById(id);
    estado_unidad === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el Estado_unidad solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, Estado_unidad);
  } catch (error) {
    handleError(error, "estado_unidad.controller -> getEstado_unidadById");
    respondError(req, res, 500, "No se pudo obtener el estado_unidad");
  }
}

/**
 * @name updateEstado_unidad
 * @description Actualiza un Estado_unidad por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateEstado_Unidad(req, res) {
  try {
    const { id } = req.params;
    const estado_unidad = await Estado_UnidadService.updateEstado_Unidad(id, req.body);
    estado_unidad === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el Estado_unidad solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_unidad);
  } catch (error) {
    handleError(error, "estado_unidad.controller -> updateEstado_unidad");
    respondError(req, res, 500, "No se pudo actualizar el estado_unidad");
  }
}

/**
 * @name deleteEstado_unidad
 * @description Elimina un Estado_unidad por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteEstado_Unidad(req, res) {
  try {
    const { id } = req.params;
    const estado_unidad = await Estado_unidadService.deleteEstado_unidad(id);
    estado_unidad === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el Estado_unidad solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, estado_unidad);
  } catch (error) {
    handleError(error, "estado_unidad.controller -> deleteEstado_unidad");
    respondError(req, res, 500, "No se pudo eliminar el Estado_unidad");
  }
}

module.exports = {
  getEstado_Unidades,
  createEstado_Unidad,
  getEstado_UnidadById,
  updateEstado_Unidad,
  deleteEstado_Unidad,
};
