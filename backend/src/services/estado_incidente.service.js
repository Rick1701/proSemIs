"use strict";
// Importa el modelo de datos 'estado_incidente'
const Estado_Incidente = require("../models/estado_incidente.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Estado_Incidente
 * @property {string} _id
 * @property {String} est_inc_descripcion
 */

/**
 * @name getEstados_Incidentes
 * @description Obtiene todos los posibles estados de las incidentes
 * @returns {Promise<Estado_Incidente[]|[]>}
 */
async function getEstados_Incidentes() {
  try {
    return await Estado_Incidente.find().populate("est_inc_incidente","inc_descripcion");
  } catch (error) {
    handleError(error, "Estado_Incidente.service -> getEstados_Incidentes");
  }
}

/**
 * @name createEstado_Incidente
 * @description Crea un nuevo estado_incidente
 * @param estado_incidente {Estado_Incidente} - Objeto con los datos de estado_incidente
 * @returns {Promise<Estado_Incidente|null>}
 */
async function createEstado_Incidente(estado_incidente) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const {est_inc_descripcion, inc_estado} = estado_incidente;
    const newEstado_Incidente = new Estado_Incidente({
      est_inc_descripcion,
      est_inc_incidente: inc_estado._id
    });
    return await newEstado_Incidente.save();
  } catch (error) {
    handleError(error, "estado_incidente.service -> createEstado_Incidente");
  }
}

/**
 * @name getEstado_IncidenteById
 * @description Obtiene un estado_incidente por su id
 * @param id {string} - Id del estado_incidente
 * @returns {Promise<Estado_Incidente|null>}
 */
async function getEstado_IncidenteById(id) {
  try {
    return await Estado_Incidente.findById({ _id: id });
  } catch (error) {
    handleError(error, "estado_incidente.service -> getEstado_IncidenteById");
  }
}

/**
 * @name updateEstado_Incidente
 * @description Actualiza un estado_incidente
 * @param id
 * @param estado_incidente
 * @returns {Promise<Estado_Incidente|null>}
 */
async function updateEstado_Incidente(id, estado_incidente) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Estado_Incidente.findByIdAndUpdate(id, estado_incidente);
  } catch (error) {
    handleError(error, "estado_incidente.service -> updateEstado_Incidente");
  }
}

/**
 * @name deleteEstado_Incidente
 * @description Elimina un estado_incidente por su id
 * @param id {string} - Id del estado_incidente
 * @returns {Promise<Estado_Incidente|null>}
 */
async function deleteEstado_Incidente(id) {
  try {
    return await Estado_Incidente.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "estado_incidente.service -> deleteEstado_Incidente");
  }
}

module.exports = {
  getEstados_Incidentes,
  createEstado_Incidente,
  getEstado_IncidenteById,
  updateEstado_Incidente,
  deleteEstado_Incidente,
};
