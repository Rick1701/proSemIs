"use strict";
// Importa el modelo de datos 'estado_brigadista'
const Estado_Brigadista = require("../models/estado_brigadista.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Estado_Brigadista
 * @property {string} _id
 * @property {String} estab_descripcion
 */

/**
 * @name getEstados_Brigadistas
 * @description Obtiene todos los psoibles estados de los brigadistas
 * @returns {Promise<Estado_Brigadista[]|[]>}
 */
/*async function getEstados_Brigadistas() {
  try {
    return await Estado_Brigadista.find(); //populate
  } catch (error) {
    handleError(error, "Estado_Brigadista.service -> getEstados_Brigadistas");
  }
}*/
async function getEstados_Brigadistas() {
  try {
    return await Estado_Brigadista.find().populate('estab_brigadista').exec();
    
    /*categorias.forEach((categoria) => {
      console.log("Categoría:", categoria);
      console.log("Siniestros asociados:");
      categoria.cat_incendio.forEach((siniestro) => {
        console.log(siniestro);
      });
    });*/

  } catch (error) {
    handleError(error, "Estado_brigadista.service -> getEstado_Brigadista");
  }
}

/**
 * @name createEstado_Brigadista
 * @description Crea un nuevo estado_brigadista
 * @param estado_brigadista {Estado_Brigadista} - Objeto con los datos de estado_brigadista
 * @returns {Promise<Estado_Brigadista|null>}
 */
async function createEstado_Brigadista(estado_brigadista) {
   try {
    const {estab_descripcion, estab_brigadista} = estado_brigadista;
    const newEstado_Brigadista = new Estado_Brigadista({
      estab_descripcion,
      estab_brigadista
    });
    return await newEstado_Brigadista.save();
  } catch (error) {
    handleError(error, "estado_brigadista.service -> createEstado_Brigadista");
  }
}

/**
 * @name getEstado_BrigadistaById
 * @description Obtiene un estado_brigadista por su id
 * @param id {string} - Id del estado_brigadista
 * @returns {Promise<Estado_Brigadista|null>}
 */
async function getEstado_BrigadistaById(id) {
  try {
    return await Estado_Brigadista.findById({ _id: id });
  } catch (error) {
    handleError(error, "estado_brigadista.service -> getEstado_BrigadistaById");
  }
}

/**
 * @name updateEstado_Brigadista
 * @description Actualiza un estado_brigadista
 * @param id
 * @param estado_brigadista
 * @returns {Promise<Estado_Brigadista|null>}
 */
async function updateEstado_Brigadista(id, estado_brigadista) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Estado_Brigadista.findByIdAndUpdate(id, estado_brigadista);
  } catch (error) {
    handleError(error, "estado_brigadista.service -> updateEstado_Brigadista");
  }
}

/**
 * @name deleteEstado_Brigadista
 * @description Elimina un estado_brigadista por su id
 * @param id {string} - Id del estado_brigadista
 * @returns {Promise<Estado_Brigadista|null>}
 */
async function deleteEstado_Brigadista(id) {
  try {
    return await Estado_Brigadista.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "estado_brigadista.service -> deleteEstado_Brigadista");
  }
}

module.exports = {
  getEstados_Brigadistas,
  createEstado_Brigadista,
  getEstado_BrigadistaById,
  updateEstado_Brigadista,
  deleteEstado_Brigadista,
};
