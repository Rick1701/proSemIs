"use strict";
// Importa el modelo de datos 'region'
const Region = require("../models/region.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Region
 * @property {string} _id
 * @property {String} reg_descripcion
 */

/**
 * @name getRegiones
 * @description Obtiene todas las regiones
 * @returns {Promise<Region[]|[]>}
 */
async function getRegiones() {
  try {
    return await Region.find();
  } catch (error) {
    handleError(error, "Region.service -> getRegiones");
  }
}

/**
 * @name createRegion
 * @description Crea una nueva region
 * @param region {Region} - Objeto con los datos de la region
 * @returns {Promise<Region|null>}
 */
async function createRegion(region) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const {reg_descripcion} = region;
    const newRegion = new Region({
      reg_descripcion,
    });
    return await newRegion.save();
  } catch (error) {
    handleError(error, "region.service -> createRegion");
  }
}

/**
 * @name getRegionById
 * @description Obtiene una region por su id
 * @param id {string} - Id de la region
 * @returns {Promise<Region|null>}
 */
async function getRegionById(id) {
  try {
    return await Region.findById({ _id: id });
  } catch (error) {
    handleError(error, "region.service -> getRegionById");
  }
}

/**
 * @name updateRegion
 * @description Actualiza una region
 * @param id
 * @param region
 * @returns {Promise<Region|null>}
 */
async function updateRegion(id, region) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Region.findByIdAndUpdate(id, region);
  } catch (error) {
    handleError(error, "region.service -> updateRegion");
  }
}

/**
 * @name deleteRegion
 * @description Elimina una region por su id
 * @param id {string} - Id de la region
 * @returns {Promise<Region|null>}
 */
async function deleteRegion(id) {
  try {
    return await Region.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "region.service -> deleteRegion");
  }
}

module.exports = {
  getRegiones,
  createRegion,
  getRegionById,
  updateRegion,
  deleteRegion,
};
