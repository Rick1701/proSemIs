"use strict";
// Importa el modelo de datos 'Incidente'
const Categoria = require("../models/categoria.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/categoria.schema");

/**
 * @typedef Categoria
 * @property {string} _id
 * @property {String} cat_descripcion
 */

/**
 * @name getCategoria
 * @description Obtiene todos las categorias
 * @returns {Promise<Categoria[]|[]>}
 */
async function getCategorias() {
  try {
    return await Categoria.find();
  } catch (error) {
    handleError(error, "Categoria.service -> getCategoria");
  }
}

/**
 * @name createCategoria
 * @description Crea una nueva categoria
 * @param categoria {Categoria} - Objeto con los datos de la categoria
 * @returns {Promise<Categoria|null>}
 */
async function createCategoria(categoria) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { cat_descripcion } = categoria;
    const newCategoria = new Categoria({
      cat_descripcion
    });
    return await newCategoria.save();
  } catch (error) {
    handleError(error, "categoria.service -> createCategoria");
  }
}

/**
 * @name getCategoriaById
 * @description Obtiene una categoria por su id
 * @param id {string} - Id de la categoria
 * @returns {Promise<Categoria|null>}
 */
async function getCategoriaById(id) {
  try {
    return await Categoria.findById({ _id: id });
  } catch (error) {
    handleError(error, "categoria.service -> getCategoriaById");
  }
}

/**
 * @name updateCategoria
 * @description Actualiza una categoria
 * @param id
 * @param categoria
 * @returns {Promise<Categoria|null>}
 */
async function updateCategoria(id, categoria) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Categoria.findByIdAndUpdate(id, categoria);
  } catch (error) {
    handleError(error, "categoria.service -> updateCategoria");
  }
}

/**
 * @name deleteCategoria
 * @description Elimina una categoria por su id
 * @param id {string} - Id de la categoria
 * @returns {Promise<Categoria|null>}
 */
async function deleteCategoria(id) {
  try {
    return await Categoria.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "categoria.service -> deleteCategoria");
  }
}

module.exports = {
  getCategorias,
  createCategoria,
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
};
