"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const SiniestroService = require("../services/siniestro.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getSiniestros
 * @description Obtiene todos los siniestros
 * @param req {Request}
 * @param res {Response}
 */
async function getSiniestros(req, res) {
  try {
    const siniestros = await SiniestroService.getSiniestros();
    siniestros.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, siniestros);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createSiniestro
 * @description Crea un nuevo siniestro
 * @param req {Request}
 * @param res {Response}
 */
async function createSiniestro(req, res) {
  try {
    const nuevoSiniestro = await SiniestroService.createSiniestro(req.body);
    if (nuevoSiniestro) {
      // Si el siniestro se creó exitosamente, respondemos con el siniestro completo
      res.status(201).json(nuevoSiniestro);
    } else {
      respondError(
        req,
        res,
        400,
        "Error en la validación de datos",
        "Bad Request",
        { message: "Verifique los datos ingresados" }
      );
    }
  } catch (error) {
    handleError(error, "siniestro.controller -> createSiniestro");
    respondError(req, res, 500, "No se pudo crear el siniestro");
  }
}


/**
 * @name getSiniestroById
 * @description Obtiene un siniestro por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getSiniestroById(req, res) {
  try {
    const { id } = req.params;

    const siniestro = await SiniestroService.getSiniestroById(id);
    siniestro === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el siniestro solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, siniestro);
  } catch (error) {
    handleError(error, "siniestro.controller -> getSiniestroById");
    respondError(req, res, 500, "No se pudo obtener el siniestro");
  }
}

/**
 * @name getEstrategiaSiniestroById
 * @description Controlador para obtener la estrategia de un siniestro por su id
 * @param req {Request} - Objeto de solicitud HTTP
 * @param res {Response} - Objeto de respuesta HTTP
 * @returns {Promise<void>}
 */
async function getEstrategiaSiniestroById(req, res) {
  try {
    const { id } = req.params;
    const estrategia = await SiniestroService.getEstrategiaSiniestroById(id);
    res.json(estrategia);
  } catch (error) {
    // Manejar el error de alguna manera apropiada
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la estrategia del siniestro' });
  }
}

/**
 * @name updateSiniestro
 * @description Actualiza un siniestro por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateSiniestro(req, res) {
  try {
    const { id } = req.params;
    const siniestro = await SiniestroService.updateSiniestro(id, req.body);
    siniestro === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el siniestro solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, siniestro);
  } catch (error) {
    handleError(error, "siniestro.controller -> updateSiniestro");
    respondError(req, res, 500, "No se pudo actualizar el siniestro");
  }
}

/**
 * @name deleteSiniestro
 * @description Elimina un siniestro por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteSiniestro(req, res) {
  try {
    const { id } = req.params;
    const siniestro = await SiniestroService.deleteSiniestro(id);
    siniestro === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el siniestro solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, siniestro);
  } catch (error) {
    handleError(error, "siniestro.controller -> deleteSiniestro");
    respondError(req, res, 500, "No se pudo eliminar el siniestro");
  }
}


//--------------------------------------------------------EStadisticas---------------------------------------------------------------------||


/*
 * @name getSumarIncendio
 * @description Obtiene una  Estadisticacopa por su id
 * @param req {Request}
 * @param res {Response}
 */
/*
async function getSumarIncendio(req, res) {
  try {
    const sumarIncendio = await SiniestroService.getSumarIncendio();
    respondSuccess(req, res, 200, { sumarIncendio });
  } catch (error) {
    handleError(error, "siniestro.controller -> getSumarIncendio");
    respondError(req, res, 500, "No se pudo obtener el total de sumar incendio");
  }
}
*/

/**
 * @name getEstadisticaCopaById
 * @description Obtiene una  Estadisticacopa por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getEstadisticaCopaById(req, res) {
  try {
    const { id } = req.params;

    const siniestro = await SiniestroService.getEstadisticaCopaById(id);
    siniestro === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el siniestro solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, siniestro);
  } catch (error) {
    handleError(error, "siniestro.controller -> getEstadisticaCopaById");
    respondError(req, res, 500, "No se pudo obtener el siniestro");
  }
}


/**
 * @name getEstadisticaSiniestroById
 * @description Obtiene una  Estadisticasiniestro por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getEstadisticaSiniestroById(req, res) {
  try {
    const { id } = req.params;

    const siniestro = await SiniestroService.getEstadisticaSiniestroById(id);
    siniestro === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el siniestro solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, siniestro);
  } catch (error) {
    handleError(error, "siniestro.controller -> getEstadisticaSiniestroById");
    respondError(req, res, 500, "No se pudo obtener el siniestro");
  }
}

/**
 * @name getEstadisticaSiniestros
 * @description Obtiene las estadisticas de todos los siniestros
 * @param req {Request}
 * @param res {Response}
 */
/*
async function getEstadisticaSiniestros(req, res) {
  try {
    const estadisticasiniestros = await SiniestroService.getEstadisticaSiniestros();
    estadisticasiniestros.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, estadisticasiniestros);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}
*/



async function getSumaTotal(req, res) {
  try {
    const sumaTotal = await siniestroService.getSumaTotal();
    res.json({ sumaTotal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





//-------------------------------------------------------------------------------------------------------------------------------||

module.exports = {
  getSiniestros,
  createSiniestro,
  getSiniestroById,
  updateSiniestro,
  deleteSiniestro,
  getEstrategiaSiniestroById,
  getEstadisticaSiniestroById,
//  getEstadisticaSiniestros,
//  getEstadisticaCopaById,
//getSumarIncendio,
  getSumaTotal
};
