"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const BaseService = require("../services/base.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getBases
 * @description Obtiene todas las bases
 * @param req {Request}
 * @param res {Response}
 */
async function getBases(req, res) {
  try {
    const bases = await BaseService.getBases();
    bases.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, bases);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createBase
 * @description Crea un nueva base
 * @param req {Request}
 * @param res {Response}
 */
async function createBase(req, res) {
  try {
    const nuevoBase = await BaseService.createBase(req.body);
    nuevoBase === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoBase);
  } catch (error) {
    handleError(error, "base.controller -> createBase");
    respondError(req, res, 500, "No se pudo crear el base");
  }
}

/**
 * @name getBaseById
 * @description Obtiene una base por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getBaseById(req, res) {
  try {
    const { id } = req.params;

    const base = await BaseService.getBaseById(id);
    base === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la base solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, base);
  } catch (error) {
    handleError(error, "base.controller -> getBaseById");
    respondError(req, res, 500, "No se pudo obtener la base");
  }
}

async function asignarBaseAIncendioController(req, res) {
  const baseId = req.params.baseId; // Obtener el ID de la base de los parámetros de la solicitud
  const incendioId = req.params.incendioId; // Obtener el ID del incendio de los parámetros de la solicitud

  const resultado = await BaseService.asignarBaseAIncendio(baseId, incendioId);

  if (resultado) {
    res.status(200).json({ message: "La base se ha asociado correctamente al incendio." });
  } else {
    res.status(404).json({ message: "No se pudo realizar la asociación de la base al incendio." });
  }
}

/**
 * @name updateBase
 * @description Actualiza una base por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateBase(req, res) {
  try {
    const { id } = req.params;
    const base = await BaseService.updateBase(id, req.body);
    base === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la base solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, base);
  } catch (error) {
    handleError(error, "base.controller -> updateBase");
    respondError(req, res, 500, "No se pudo actualizar la base");
  }
}

/**
 * @name deleteBase
 * @description Elimina una base por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteBase(req, res) {
  try {
    const { id } = req.params;
    const base = await BaseService.deleteBase(id);
    base === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la base solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, base);
  } catch (error) {
    handleError(error, "base.controller -> deleteBase");
    respondError(req, res, 500, "No se pudo eliminar la base");
  }
}




//-------------------------------------------------------------Estadisticas-------------------------------------------------------------------------------||

/**
 * @name getEstadisticaBaseById
 * @description Obtiene una  Estadisticabase por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getEstadisticaBaseById(req, res) {
  try {
    const { id } = req.params;

    const base = await BaseService.getEstadisticaBaseById(id);
    base === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la base solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, base);
  } catch (error) {
    handleError(error, "base.controller -> getEstadisticaBaseById");
    respondError(req, res, 500, "No se pudo obtener la base");
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------||

module.exports = {
  getBases,
  createBase,
  getBaseById,
  updateBase,
  deleteBase,
  getEstadisticaBaseById,
  asignarBaseAIncendioController
};
