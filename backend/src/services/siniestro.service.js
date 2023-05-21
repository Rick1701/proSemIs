"use strict";
// Importa el modelo de datos 'User'
const Siniestro = require("../models/siniestro.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Siniestro
 * @property {string} _id
 * @property {String} sin_velocidadViento
 * @property {String} sin_direccionViento
 * @property {String} sin_temperatura
 * @property {String} sin_humedad
 * @property {String} sin_presion
 * @property {Date} sin_fechaInicio
 * @property {Date} sin_fechaTermino
 */

/**
 * @name getSiniestros
 * @description Obtiene todos los siniestros
 * @returns {Promise<Siniestro[]|[]>}
 */
async function getSiniestros() {
  try {
    return await Siniestro.find();
  } catch (error) {
    handleError(error, "Siniestro.service -> getSiniestros");
  }
}

/**
 * @name createSiniestro
 * @description Crea un nuevo siniestro
 * @param siniestro {Siniestro} - Objeto con los datos del siniestro
 * @returns {Promise<Siniestro|null>}
 */
async function createSiniestro(siniestro) {
  // Esta funcion es similar al singup
  try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { sin_velocidadViento, sin_direccionViento, sin_temperatura, sin_humedad, sin_presion, sin_fechaInicio, sin_fechaTermino} = siniestro;
    const newSiniestro = new Siniestro({
      sin_velocidadViento,
      sin_direccionViento,
      sin_temperatura,
      sin_humedad,
      sin_presion,
      sin_fechaInicio,
      sin_fechaTermino,
    });
    return await newSiniestro.save();
  } catch (error) {
    handleError(error, "siniestro.service -> createSiniestro");
  }
}

/**
 * @name getSiniestroById
 * @description Obtiene un siniestro por su id
 * @param id {string} - Id del siniestro
 * @returns {Promise<Siniestro|null>}
 */
async function getSiniestroById(id) {
  try {
    return await Siniestro.findById({ _id: id });
  } catch (error) {
    handleError(error, "siniestro.service -> getSiniestroById");
  }
}

/**
 * @name updateSiniestro
 * @description Actualiza un siniestro
 * @param id
 * @param siniestro
 * @returns {Promise<Siniestro|null>}
 */
async function updateSiniestro(id, siniestro) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Siniestro.findByIdAndUpdate(id, siniestro);
  } catch (error) {
    handleError(error, "siniestro.service -> updateSiniestro");
  }
}

/**
 * @name deleteSiniestro
 * @description Elimina un siniestro por su id
 * @param id {string} - Id del siniestro
 * @returns {Promise<Siniestro|null>}
 */
async function deleteSiniestro(id) {
  try {
    return await Siniestro.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "siniestro.service -> deleteSiniestro");
  }
}








//--------------------------------------------------------------- ESTADISTICAS METODOS ----------------------------------------------------------------]


/**
 * @name getEstadisticasSiniestros
 * @description
 * @returns {Promise<Siniestro[]|[]>}
 */
//async function getSiniestros() {
//  try {
//    return await Siniestro.find();
//  } catch (error) {
//    handleError(error, "Siniestro.service -> getSiniestros");
//  }
//}


/**
 * @name getEstadisticaSiniestroById
 * @description Obtiene la estadística de los siniestros
 * @param id {string} - Id del siniestro
 * @returns {Promise<Siniestro|null>}
 */
async function getEstadisticaSiniestroById(id) {
  try {
    //Agregar Suma Gasto Recursos
    //const siniestro = await Siniestro.findById({ _id: id });
    // Obtener los valores de los atributos
    //const uaerea_nombre = parseInt(siniestro.uaerea_nombre);
    //const uterrestre_nombre = parseFloat(siniestro.uterrestre_nombre);
    // Realizar la suma
    //const sumaGastoRecursos = uaerea_nombre + uterrestre_nombre;
    // Resto de la lógica para obtener la estadística de los siniestros
    //return sumaGastoRecursos;}
    // Aquí va la lógica para obtener la estadística de los siniestros
    // Puedes realizar consultas a la base de datos u operaciones necesarias
    // Retorna el resultado de la estadística
    return await Siniestro.findById({ _id: id });
  } catch (error) {
    handleError(error, "siniestro.service -> getEstadisticaSiniestroById");
  }
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------]



module.exports = {
  getSiniestros,
  createSiniestro,
  getSiniestroById,
  updateSiniestro,
  deleteSiniestro,

  getEstadisticaSiniestroById,
  //getEstadisticaSiniestros,
};
