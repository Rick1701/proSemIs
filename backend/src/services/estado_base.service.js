"use strict";
// Importa el modelo de datos 'estado_base'
const Estado_Base = require("../models/estado_base.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Estado_Base
 * @property {string} _id
 * @property {String} est_bas_descripcion
 */

/**
 * @name getEstados_Bases
 * @description Obtiene todos los posibles estados de las bases
 * @returns {Promise<Estado_Base[]|[]>}
 */
async function getEstados_Bases() {
  try {
    return await Estado_Base.find();
  } catch (error) {
    handleError(error, "Estado_Base.service -> getEstados_Bases");
  }
}

/**
 * @name createEstado_Base
 * @description Crea un nuevo estado_base
 * @param estado_base {Estado_Base} - Objeto con los datos de estado_base
 * @returns {Promise<Estado_Base|null>}
 */
async function createEstado_Base(estado_base) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const {est_bas_descripcion} = estado_base;
    const newEstado_Base = new Estado_Base({
      est_bas_descripcion,
    });
    return await newEstado_Base.save();
  } catch (error) {
    handleError(error, "estado_base.service -> createEstado_Base");
  }
}

/**
 * @name getEstado_BaseById
 * @description Obtiene un estado_base por su id
 * @param id {string} - Id del estado_base
 * @returns {Promise<Estado_Base|null>}
 */
async function getEstado_BaseById(id) {
  try {
    return await Estado_Base.findById({ _id: id });
  } catch (error) {
    handleError(error, "estado_base.service -> getEstado_BaseById");
  }
}

/**
 * @name updateEstado_Base
 * @description Actualiza un estado_base
 * @param id
 * @param estado_base
 * @returns {Promise<Estado_Base|null>}
 */
async function updateEstado_Base(id, estado_base) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Estado_Base.findByIdAndUpdate(id, estado_base);
  } catch (error) {
    handleError(error, "estado_base.service -> updateEstado_Base");
  }
}

/**
 * @name deleteEstado_Base
 * @description Elimina un estado_base por su id
 * @param id {string} - Id del estado_base
 * @returns {Promise<Estado_Base|null>}
 */
async function deleteEstado_Base(id) {
  try {
    return await Estado_Base.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "estado_base.service -> deleteEstado_Base");
  }
}

module.exports = {
  getEstados_Bases,
  createEstado_Base,
  getEstado_BaseById,
  updateEstado_Base,
  deleteEstado_Base,
};
