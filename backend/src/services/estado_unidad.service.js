"use strict";
// Importa el modelo de datos 'User'
const Estado_unidad = require("../models/estado_unidad.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Estado_unidad
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
 * @name getEstado_unidades
 * @description Obtiene todos los Estado_unidades
 * @returns {Promise<Estado_unidad[]|[]>}
 */
async function getEstado_unidades() {
  try {
    return await Estado_unidad.find();
  } catch (error) {
    handleError(error, "Estado_unidad.service -> getEstado_unidades");
  }
}

/**
 * @name createEstado_unidad
 * @description Crea un nuevo Estado_unidad
 * @param Estado_unidad {Estado_unidad} - Objeto con los datos del Estado_unidad
 * @returns {Promise<Estado_unidad|null>}
 */
async function createEstado_unidad(estado_unidad) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { est_uni_descripcion, est_uni_aerea, est_uni_terrestre} = estado_unidad;
    const newEstado_unidad = new Estado_unidad({
      est_uni_descripcion,
      est_uni_aerea,
      est_uni_terrestre
    });
    return await newEstado_unidad.save();
  } catch (error) {
    handleError(error, "estado_unidad.service -> createEstado_unidad");
  }
}

/**
 * @name getEstado_unidadById
 * @description Obtiene un estado_unidad por su id
 * @param id {string} - Id del Estado_unidad
 * @returns {Promise<Estado_unidad|null>}
 */
async function getEstado_unidadById(id) {
  try {
    return await Estado_unidad.findById({ _id: id });
  } catch (error) {
    handleError(error, "estado_unidad.service -> getEstado_unidadById");
  }
}

/**
 * @name updateEstado_unidad
 * @description Actualiza un estado_unidad
 * @param id
 * @param estado_unidad
 * @returns {Promise<Estado_unidad|null>}
 */
async function updateEstado_unidad(id, estado_unidad) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Estado_unidad.findByIdAndUpdate(id, estado_unidad);
  } catch (error) {
    handleError(error, "estado_unidad.service -> updateEstado_unidad");
  }
}

/**
 * @name deleteEstado_unidad
 * @description Elimina un Estado_unidad por su id
 * @param id {string} - Id del Estado_unidad
 * @returns {Promise<Estado_unidad|null>}
 */
async function deleteEstado_unidad(id) {
  try {
    return await Estado_unidad.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "estado_unidad.service -> deleteEstado_unidad");
  }
}

module.exports = {
  getEstado_unidades,
  createEstado_unidad,
  getEstado_unidadById,
  updateEstado_unidad,
  deleteEstado_unidad,
};
