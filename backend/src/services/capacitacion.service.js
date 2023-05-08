"use strict";
// Importa el modelo de datos 'capacitacion'
const Capacitacion = require("../models/capacitacion.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Capacitacion
 * @property {string} _id
 * @property {String} cap_descripcion
 */

/**
 * @name getCapacitaciones
 * @description Obtiene todas las capacitaciones
 * @returns {Promise<Capacitacion[]|[]>}
 */
async function getCapacitaciones() {
  try {
    return await Capacitacion.find();
  } catch (error) {
    handleError(error, "Capacitacion.service -> getCapacitaciones");
  }
}

/**
 * @name createCapacitacion
 * @description Crea una nueva capacitacion
 * @param capacitacion {Capacitacion} - Objeto con los datos de la capacitacion
 * @returns {Promise<Capacitacion|null>}
 */
async function createCapacitacion(capacitacion) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { cap_descripcion} = capacitacion;
    const newCapacitacion = new Capacitacion({
      cap_descripcion,
    });
    return await newCapacitacion.save();
  } catch (error) {
    handleError(error, "capacitacion.service -> createCapacitacion");
  }
}

/**
 * @name getCapacitacionById
 * @description Obtiene una capacitacion por su id
 * @param id {string} - Id de la capacitacion
 * @returns {Promise<Capacitacion|null>}
 */
async function getCapacitacionById(id) {
  try {
    return await Capacitacion.findById({ _id: id });
  } catch (error) {
    handleError(error, "capacitacion.service -> getCapacitacionById");
  }
}

/**
 * @name updateCapacitacion
 * @description Actualiza una capacitacion
 * @param id
 * @param capacitacion
 * @returns {Promise<Capacitacion|null>}
 */
async function updateCapacitacion(id, capacitacion) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Capacitacion.findByIdAndUpdate(id, capacitacion);
  } catch (error) {
    handleError(error, "capacitacion.service -> updateCapacitacion");
  }
}

/**
 * @name deleteCapacitacion
 * @description Elimina una capacitacion por su id
 * @param id {string} - Id de la capacitacion
 * @returns {Promise<Capacitacion|null>}
 */
async function deleteCapacitacion(id) {
  try {
    return await Capacitacion.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "capacitacion.service -> deleteCapacitacion");
  }
}

module.exports = {
  getCapacitaciones,
  createCapacitacion,
  getCapacitacionById,
  updateCapacitacion,
  deleteCapacitacion,
};
