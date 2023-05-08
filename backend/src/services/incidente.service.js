"use strict";
// Importa el modelo de datos 'Incidente'
const Incidente = require("../models/incidente.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/incidente.schema");

/**
 * @typedef Incidente
 * @property {string} _id
 * @property {String} inc_descripcion
 */

/**
 * @name getIncidente
 * @description Obtiene todos los incidentes
 * @returns {Promise<Incidente[]|[]>}
 */
async function getIncidentes() {
  try {
    return await Incidente.find();
  } catch (error) {
    handleError(error, "Incidente.service -> getIncidentes");
  }
}

/**
 * @name createIncidente
 * @description Crea un nuevo incidente
 * @param incidente {Incidente} - Objeto con los datos del incidente
 * @returns {Promise<Incidente|null>}
 */
async function createIncidente(incidente) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { inc_descripcion } = incidente;
    const newIncidente = new Incidente({
      inc_descripcion
    });
    return await newIncidente.save();
  } catch (error) {
    handleError(error, "incidente.service -> createIncidente");
  }
}

/**
 * @name getIncidenteById
 * @description Obtiene un incidente por su id
 * @param id {string} - Id del incidente
 * @returns {Promise<Incidente|null>}
 */
async function getIncidenteById(id) {
  try {
    return await Incidente.findById({ _id: id });
  } catch (error) {
    handleError(error, "incidente.service -> getIncidenteById");
  }
}

/**
 * @name updateIncidente
 * @description Actualiza un incidente
 * @param id
 * @param incidente
 * @returns {Promise<Incidente|null>}
 */
async function updateIncidente(id, incidente) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Incidente.findByIdAndUpdate(id, incidente);
  } catch (error) {
    handleError(error, "incidente.service -> updateIncidente");
  }
}

/**
 * @name deleteIncidente
 * @description Elimina un incidente por su id
 * @param id {string} - Id del incidente
 * @returns {Promise<Incidente|null>}
 */
async function deleteIncidente(id) {
  try {
    return await Incidente.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "incidente.service -> deleteIncidente");
  }
}

module.exports = {
  getIncidentes,
  createIncidente,
  getIncidenteById,
  updateIncidente,
  deleteIncidente,
};
