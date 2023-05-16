"use strict";
// Importa el modelo de datos 'User'
const Uterrestre = require("../models/uterrestre.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Uterrestre
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
 * @name getUterrestres
 * @description Obtiene todos los Uterrestres
 * @returns {Promise<Uterrestre[]|[]>}
 */
async function getUterrestres() {
  try {
    return await Uterrestre.find();
  } catch (error) {
    handleError(error, "Uterrestre.service -> getUterrestres");
  }
}

/**
 * @name createUterrestre
 * @description Crea un nuevo Uterrestre
 * @param uterrestre {Uterrestre} - Objeto con los datos del Uterrestre
 * @returns {Promise<Uterrestre|null>}
 */
async function createUterrestre(uterrestre) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { uterrestre_nombre} = uterrestre;
    const newUterrestre = new Uterrestre({
      uterrestre_nombre,
      
    });
    return await newUterrestre.save();
  } catch (error) {
    handleError(error, "uterrestre.service -> createUterrestre");
  }
}

/**
 * @name getUterrestreById
 * @description Obtiene un Uterrestre por su id
 * @param id {string} - Id del Uterrestre
 * @returns {Promise<Uterrestre|null>}
 */
async function getUterrestreById(id) {
  try {
    return await Uterrestre.findById({ _id: id });
  } catch (error) {
    handleError(error, "uterrestre.service -> getUterrestreById");
  }
}

/**
 * @name updateUterrestre
 * @description Actualiza un uterrestre
 * @param id
 * @param uterrestre
 * @returns {Promise<Uterrestre|null>}
 */
async function updateUterrestre(id, uterrestre) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Uterrestre.findByIdAndUpdate(id, uterrestre);
  } catch (error) {
    handleError(error, "uterrestre.service -> updateUterrestre");
  }
}

/**
 * @name deleteUterrestre
 * @description Elimina un Uterrestre por su id
 * @param id {string} - Id del Uterrestre
 * @returns {Promise<Uterrestre|null>}
 */
async function deleteUterrestre(id) {
  try {
    return await Uterrestre.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "uterrestre.service -> deleteUterrestre");
  }
}

module.exports = {
  getUterrestres,
  createUterrestre,
  getUterrestreById,
  updateUterrestre,
  deleteUterrestre,
};
