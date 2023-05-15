"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CategoriaService = require("../services/categoria.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getCategorias
 * @description Obtiene todas las categorias
 * @param res {Response}
 */
async function getCategorias(req, res) {
  try {
    const categorias = await CategoriaService.getCategorias();
    categorias.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, categorias);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createCategoria
 * @description Crea una nueva categoria
 * @param req {Request}
 * @param res {Response}
 */
async function createCategoria(req, res) {
  try {
    const nuevaCategoria = await CategoriaService.createCategoria(req.body);
    nuevaCategoria === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevaCategoria);
  } catch (error) {
    handleError(error, "categoria.controller -> createCategoria");
    respondError(req, res, 500, "No se pudo crear la categoria");
  }
}

/**
 * @name getCategoriaById
 * @description Obtiene una categoria por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getCategoriaById(req, res) {
  try {
    const { id } = req.params;

    const categoria = await CategoriaService.getCategoriaById(id);
    categoria === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la categoria solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, categoria);
  } catch (error) {
    handleError(error, "categoria.controller -> getCategoriaById");
    respondError(req, res, 500, "No se pudo obtener la categoria");
  }
}

/**
 * @name updateCategoria
 * @description Actualiza una categoria por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateCategoria(req, res) {
  try {
    const { id } = req.params;
    const categoria = await CategoriaService.updateCategoria(id, req.body);
    categoria === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la categoria solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, categoria);
  } catch (error) {
    handleError(error, "categoria.controller -> updateCategoria");
    respondError(req, res, 500, "No se pudo actualizar la categoria");
  }
}

/**
 * @name deleteCategoria
 * @description Elimina una categoria por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteCategoria(req, res) {
  try {
    const { id } = req.params;
    const categoria = await CategoriaService.deleteCategoria(id);
    categoria === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro la categoria solicitada",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, categoria);
  } catch (error) {
    handleError(error, "categoria.controller -> deleteCategoria");
    respondError(req, res, 500, "No se pudo eliminar la categoria");
  }
}

module.exports = {
  getCategorias,
  createCategoria,
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
};
