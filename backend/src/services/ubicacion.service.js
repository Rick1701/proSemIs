"use strict";
// Importa el modelo de datos 'ubicacion'
const Ubicacion = require("../models/ubicacion.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Ubicacion
 * @property {string} _id
 * @property {String} ubi_comuna
 * @property {String} ubi_cantidadPlantacion
 * @property {String} ubi_tipoPlantacion
 */

/**
 * @name getUbicaciones
 * @description Obtiene todas las ubicaciones
 * @returns {Promise<Ubicacion[]|[]>}
 */
async function getUbicaciones() {
  try {
    return await Ubicacion.find();
  } catch (error) {
    handleError(error, "Ubicacion.service -> getUbicaciones");
  }
}

/**
 * @name createUbicacion
 * @description Crea una nueva ubicacion
 * @param ubicacion {Ubicacion} - Objeto con los datos de la ubicacion
 * @returns {Promise<Ubicacion|null>}
 */
async function createUbicacion(ubicacion) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { ubi_comuna, ubi_cantidadPlantacion, ubi_tipoPlantacion} = ubicacion;
    const newUbicacion = new Ubicacion({
      ubi_comuna,
      ubi_cantidadPlantacion,
      ubi_tipoPlantacion,
    });
    return await newUbicacion.save();
  } catch (error) {
    handleError(error, "ubicacion.service -> createUbicacion");
  }
}

/**
 * @name getUbicacionById
 * @description Obtiene una ubicacion por su id
 * @param id {string} - Id de la ubicacion
 * @returns {Promise<Ubicacion|null>}
 */
async function getUbicacionById(id) {
  try {
    return await Ubicacion.findById({ _id: id });
  } catch (error) {
    handleError(error, "ubicacion.service -> getUbicacionById");
  }
}

/**
 * @name updateUbicacion
 * @description Actualiza una ubicacion
 * @param id
 * @param ubicacion
 * @returns {Promise<Ubicacion|null>}
 */
async function updateUbicacion(id, ubicacion) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Ubicacion.findByIdAndUpdate(id, ubicacion);
  } catch (error) {
    handleError(error, "ubicacion.service -> updateUbicacion");
  }
}

/**
 * @name deleteUbicacion
 * @description Elimina una ubicacion por su id
 * @param id {string} - Id de la ubicacion
 * @returns {Promise<Ubicacion|null>}
 */
async function deleteUbicacion(id) {
  try {
    return await Ubicacion.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "ubicacion.service -> deleteUbicacion");
  }
}

module.exports = {
  getUbicaciones,
  createUbicacion,
  getUbicacionById,
  updateUbicacion,
  deleteUbicacion,
};
