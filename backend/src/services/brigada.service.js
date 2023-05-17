"use strict";
// Importa el modelo de datos 'brigada'
const Brigada = require("../models/brigada.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Brigada
 * @property {string} _id
 * @property {String} bri_nombre
 * @property {Number} bri_cantidad
 * @property {String} bri_especialidad
 */

/**
 * @name getBrigadas
 * @description Obtiene todas las brigadas
 * @returns {Promise<Brigada[]|[]>}
 */
async function getBrigadas() {
  try {
    return await Brigada.find();
  } catch (error) {
    handleError(error, "Brigada.service -> getBrigadas");
  }
}

/**
 * @name createBrigada
 * @description Crea una nueva brigada
 * @param brigada {Brigada} - Objeto con los datos de la brigada
 * @returns {Promise<Brigada|null>}
 */
async function createBrigada(brigada) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { bri_nombre, bri_cantidad, bri_especialidad} = brigada;
    const newBrigada = new Brigada({
      bri_nombre,
      bri_cantidad,
      bri_especialidad,
    });
    return await newBrigada.save();
  } catch (error) {
    handleError(error, "brigada.service -> createBrigada");
  }
}

/**
 * @name getBrigadaById
 * @description Obtiene una brigada por su id
 * @param id {string} - Id de la brigada
 * @returns {Promise<Brigada|null>}
 */
async function getBrigadaById(id) {
  try {
    return await Brigada.findById({ _id: id });
  } catch (error) {
    handleError(error, "brigada.service -> getBrigadaById");
  }
}

/**
 * @name updateBrigada
 * @description Actualiza una brigada
 * @param id
 * @param brigada
 * @returns {Promise<Brigada|null>}
 */
async function updateBrigada(id, brigada) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Brigada.findByIdAndUpdate(id, brigada);
  } catch (error) {
    handleError(error, "brigada.service -> updateBrigada");
  }
}

/**
 * @name deleteBrigada
 * @description Elimina una brigada por su id
 * @param id {string} - Id de la brigada
 * @returns {Promise<Brigada|null>}
 */
async function deleteBrigada(id) {
  try {
    return await Brigada.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "brigada.service -> deleteBrigada");
  }
}

module.exports = {
  getBrigadas,
  createBrigada,
  getBrigadaById,
  updateBrigada,
  deleteBrigada,
};
