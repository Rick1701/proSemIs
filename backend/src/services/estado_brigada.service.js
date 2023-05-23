"use strict";
// Importa el modelo de datos 'estado_brigada'
const Estado_Brigada = require("../models/estado_brigada.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Estado_Brigada
 * @property {string} _id
 * @property {String} estabr_descripcion
 */

/**
 * @name getEstados_Brigadas
 * @description Obtiene todos los posibles estados de las brigadas
 * @returns {Promise<Estado_Brigada[]|[]>}
 */
async function getEstados_Brigadas() {
  try {
    return await Estado_Brigada.find().populate("estabr_brigada");
  } catch (error) {
    handleError(error, "Estado_Brigada.service -> getEstados_Brigadas");
  }
}

/**
 * @name createEstado_Brigada
 * @description Crea un nuevo estado_brigada
 * @param estado_brigada {Estado_Brigada} - Objeto con los datos de estado_brigada
 * @returns {Promise<Estado_Brigada|null>}
 */
async function createEstado_Brigada(estado_brigada) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const {estabr_descripcion, estabr_brigada} = estado_brigada;
    const newEstado_Brigada = new Estado_Brigada({
      estabr_descripcion,
      estabr_brigada
    });
    return await newEstado_Brigada.save();
  } catch (error) {
    handleError(error, "estado_brigada.service -> createEstado_Brigada");
  }
}

/**
 * @name getEstado_BrigadaById
 * @description Obtiene un estado_brigada por su id
 * @param id {string} - Id del estado_brigada
 * @returns {Promise<Estado_Brigada|null>}
 */
async function getEstado_BrigadaById(id) {
  try {
    return await Estado_Brigada.findById({ _id: id });
  } catch (error) {
    handleError(error, "estado_brigada.service -> getEstado_BrigadaById");
  }
}

/**
 * @name updateEstado_Brigada
 * @description Actualiza un estado_brigada
 * @param id
 * @param estado_brigada
 * @returns {Promise<Estado_Brigada|null>}
 */
async function updateEstado_Brigada(id, estado_brigada) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Estado_Brigada.findByIdAndUpdate(id, estado_brigada);
  } catch (error) {
    handleError(error, "estado_brigada.service -> updateEstado_Brigada");
  }
}

/**
 * @name deleteEstado_Brigada
 * @description Elimina un estado_brigada por su id
 * @param id {string} - Id del estado_brigada
 * @returns {Promise<Estado_Brigada|null>}
 */
async function deleteEstado_Brigada(id) {
  try {
    return await Estado_Brigada.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "estado_brigada.service -> deleteEstado_Brigada");
  }
}

module.exports = {
  getEstados_Brigadas,
  createEstado_Brigada,
  getEstado_BrigadaById,
  updateEstado_Brigada,
  deleteEstado_Brigada,
};
