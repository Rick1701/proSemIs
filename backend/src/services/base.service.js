"use strict";
// Importa el modelo de datos 'User'
const Base = require("../models/base.model.js");
const Estado_Base = require("../models/estado_base.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Base
 * @property {string} _id
 * @property {String} base_descripcion,
 * @property {Number} base_latitud,
 * @property {Number} base_incendios_asistidos
 * @property {mongoose.Schema.Types.ObjectId} base_estado 
 */

/**
 * @name getBases
 * @description Obtiene todos los bases
 * @returns {Promise<Base[]|[]>}
 */
async function getBases() {
  try {
    return await Base.find();
  } catch (error) {
    handleError(error, "Base.service -> getBases");
  }
}

/**
 * @name createBase
 * @description Crea un nuevo Base
 * @param Base {Base} - Objeto con los datos de la base
 * @returns {Promise<Base|null>}
 */
async function createBase(base) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { base_descripcion,base_latitud,base_incendios_asistidos, base_estado} = base;
    const estado_base = await Estado_Base.findById(base_estado);
    if(!estado_base){
      handleError(error, "base.service -> createBase");
    }
    const newBase = new Base({
      base_descripcion,
      base_latitud,
      base_incendios_asistidos,
      base_estado: estado_base._id
    });
    estado_base.est_bas_base.push(newBase._id);
    await estado_base.save();
    return await newBase.save();
  } catch (error) {
    handleError(error, "base.service -> createBase");
  }
}

/**
 * @name getBaseById
 * @description Obtiene un base por su id
 * @param id {string} - Id del base
 * @returns {Promise<Base|null>}
 */
async function getBaseById(id) {
  try {
    return await Base.findById({ _id: id });
  } catch (error) {
    handleError(error, "base.service -> getBaseById");
  }
}

/**
 * @name updateBase
 * @description Actualiza una base
 * @param id
 * @param base
 * @returns {Promise<Base|null>}
 */
async function updateBase(id, base) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Base.findByIdAndUpdate(id, base);
  } catch (error) {
    handleError(error, "base.service -> updateBase");
  }
}

/**
 * @name deleteBase
 * @description Elimina un Base por su id
 * @param id {string} - Id del Base
 * @returns {Promise<Base|null>}
 */
async function deleteBase(id) {
  try {
    return await Base.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "base.service -> deleteBase");
  }
}

module.exports = {
  getBases,
  createBase,
  getBaseById,
  updateBase,
  deleteBase,
};
