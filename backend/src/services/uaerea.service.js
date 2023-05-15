"use strict";
// Importa el modelo de datos 'User'
const Uaerea = require("../models/uaerea.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Uaerea
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
 * @name getUaereas
 * @description Obtiene todos los Uaereas
 * @returns {Promise<Uaerea[]|[]>}
 */
async function getUaereas() {
  try {
    return await Uaerea.find();
  } catch (error) {
    handleError(error, "Uaerea.service -> getUaereas");
  }
}

/**
 * @name createUaerea
 * @description Crea un nuevo Uaerea
 * @param uaerea {Uaerea} - Objeto con los datos del Uaerea
 * @returns {Promise<Uaerea|null>}
 */
async function createUaerea(uaerea) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { uaerea_nombre} = uaerea;
    const newUaerea = new Uaerea({
      uaerea_nombre,
      
    });
    return await newUaerea.save();
  } catch (error) {
    handleError(error, "uaerea.service -> createUaerea");
  }
}

/**
 * @name getUaereaById
 * @description Obtiene un Uaerea por su id
 * @param id {string} - Id del Uaerea
 * @returns {Promise<Uaerea|null>}
 */
async function getUaereaById(id) {
  try {
    return await Uaerea.findById({ _id: id });
  } catch (error) {
    handleError(error, "uaerea.service -> getUaereaById");
  }
}

/**
 * @name updateUaerea
 * @description Actualiza un uaerea
 * @param id
 * @param uaerea
 * @returns {Promise<Uaerea|null>}
 */
async function updateUaerea(id, uaerea) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Uaerea.findByIdAndUpdate(id, uaerea);
  } catch (error) {
    handleError(error, "uaerea.service -> updateUaerea");
  }
}

/**
 * @name deleteUaerea
 * @description Elimina un Uaerea por su id
 * @param id {string} - Id del Uaerea
 * @returns {Promise<Uaerea|null>}
 */
async function deleteUaerea(id) {
  try {
    return await Uaerea.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "uaerea.service -> deleteUaerea");
  }
}

module.exports = {
  getUaereas,
  createUaerea,
  getUaereaById,
  updateUaerea,
  deleteUaerea,
};
