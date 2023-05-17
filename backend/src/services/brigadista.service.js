"use strict";
// Importa el modelo de datos 'brigadista'
const Brigadista = require("../models/brigadista.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Brigadista
 * @property {string} _id
 * @property {String} brig_rut
 * @property {String} brig_nombres
 * @property {String} brig_apellidos
 * @property {String} brig_sexo
 * @property {Number} brig_edad
 */

/**
 * @name getBrigadistas
 * @description Obtiene todos los brigadistas
 * @returns {Promise<Brigadista[]|[]>}
 */
async function getBrigadistas() {
  try {
    return await Brigadista.find();
  } catch (error) {
    handleError(error, "Brigadista.service -> getBrigadistas");
  }
}

/**
 * @name createBrigadista
 * @description Crea un nuevo brigadista
 * @param brigadista {Brigadista} - Objeto con los datos de brigadista
 * @returns {Promise<Brigadista|null>}
 */
async function createBrigadista(brigadista) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { brig_rut, brig_nombres, brig_apellidos, brig_sexo, brig_edad} = brigadista;
    const newBrigadista = new Brigadista({
      brig_rut,
      brig_nombres,
      brig_apellidos,
      brig_sexo,
      brig_edad,
    });
    return await newBrigadista.save();
  } catch (error) {
    handleError(error, "brigadista.service -> createBrigadista");
  }
}

/**
 * @name getBrigadistaById
 * @description Obtiene un brigadista por su id
 * @param id {string} - Id del brigadista
 * @returns {Promise<Brigadista|null>}
 */
async function getBrigadistaById(id) {
  try {
    return await Brigadista.findById({ _id: id });
  } catch (error) {
    handleError(error, "brigadista.service -> getBrigadistaById");
  }
}

/**
 * @name updateBrigadista
 * @description Actualiza un brigadista
 * @param id
 * @param brigadista
 * @returns {Promise<Brigadista|null>}
 */
async function updateBrigadista(id, brigadista) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Brigadista.findByIdAndUpdate(id, brigadista);
  } catch (error) {
    handleError(error, "brigadista.service -> updateBrigadista");
  }
}

/**
 * @name deleteBrigadista
 * @description Elimina un brigadista por su id
 * @param id {string} - Id del brigadista
 * @returns {Promise<Brigadista|null>}
 */
async function deleteBrigadista(id) {
  try {
    return await Brigadista.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "brigadista.service -> deleteBrigadista");
  }
}

module.exports = {
  getBrigadistas,
  createBrigadista,
  getBrigadistaById,
  updateBrigadista,
  deleteBrigadista,
};
