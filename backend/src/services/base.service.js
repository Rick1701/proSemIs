"use strict";
// Importa el modelo de datos 'User'
const Base = require("../models/base.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Base
 * @property {string} _id
 * @property {String} sin_velocidadViento
 * @property {String} sin_direccionViento
 * @property {String} sin_temperatura
 * @property {String} sin_humedad
 * @property {String} sin_presion
 * @property {Date} sin_fechaInicio
 * @property {Date} sin_fechaTermino
 */

/**
 * @name getBases
 * @description Obtiene todos los bases
 * @returns {Promise<Base[]|[]>}
 */
async function getBases() {
  try {
    return await Base.find();
  } catch (error) {
    handleError(error, "Base.service -> getBases");
  }
}

/**
 * @name createBase
 * @description Crea un nuevo Base
 * @param Base {Base} - Objeto con los datos de la base
 * @returns {Promise<Base|null>}
 */
async function createBase(base) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { base_descripcion,base_latitud} = base;
    const newBase = new Base({
      base_descripcion,
      base_latitud
    });
    return await newBase.save();
  } catch (error) {
    handleError(error, "base.service -> createBase");
  }
}

/**
 * @name getBaseById
 * @description Obtiene un base por su id
 * @param id {string} - Id del base
 * @returns {Promise<Base|null>}
 */
async function getBaseById(id) {
  try {
    return await Base.findById({ _id: id });
  } catch (error) {
    handleError(error, "base.service -> getBaseById");
  }
}

/**
 * @name updateBase
 * @description Actualiza una base
 * @param id
 * @param base
 * @returns {Promise<Base|null>}
 */
async function updateBase(id, base) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Base.findByIdAndUpdate(id, base);
  } catch (error) {
    handleError(error, "base.service -> updateBase");
  }
}

/**
 * @name deleteBase
 * @description Elimina un Base por su id
 * @param id {string} - Id del Base
 * @returns {Promise<Base|null>}
 */
async function deleteBase(id) {
  try {
    return await Base.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "base.service -> deleteBase");
  }
}

module.exports = {
  getBases,
  createBase,
  getBaseById,
  updateBase,
  deleteBase,
};
