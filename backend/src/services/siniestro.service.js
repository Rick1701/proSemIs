"use strict";
// Importa el modelo de datos 'User'
const Siniestro = require("../models/siniestro.model.js");
const Categoria = require("../models/categoria.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Siniestro
 * @property {string} _id
 * @property {String} sin_velocidadViento
 * @property {String} sin_temperatura
 * @property {String} sin_humedad
 * @property {Date} sin_fechaInicio
 * @property {Date} sin_fechaTermino
 * @property {Number} sin_latitud
 * @property {String} sin_superficie
 * @property {String} sin_distribucion_fuego
 */

/**
 * @name getSiniestros
 * @description Obtiene todos los siniestros
 * @returns {Promise<Siniestro[]|[]>}
 */
async function getSiniestros() {
  try {
    //const siniestros = await Siniestro.find().populate('sin_categoria').exec();
    return await Siniestro.find().populate('sin_categoria').exec();
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
    const { sin_velocidadViento, sin_temperatura, sin_humedad, sin_fechaInicio, sin_fechaTermino, sin_latitud, sin_superficie, sin_distribucion_fuego, sin_categoria} = siniestro;

    //Buscar la instancia de Categoría existente en base al ID proporcionado en body:
    const categoria = await Categoria.findById(sin_categoria);
    if(!categoria){
      handleError(error, "siniestro.service -> createSiniestro");
    }

    const newSiniestro = new Siniestro({
      sin_velocidadViento,
      sin_temperatura,
      sin_humedad,
      sin_fechaInicio,
      sin_fechaTermino,
      sin_latitud,
      sin_superficie,
      sin_distribucion_fuego,
      sin_categoria: categoria._id,
    });
    //INSERTO LA ID DEL INCENDIO EN LA CATEGORIA:
    categoria.cat_incendio.push(newSiniestro._id);
    //UNA VEZ INSERTADA LA ID DEL INCENDIO EN LA CATEGORIA, GUARDO LA CATEGORIA:
    await categoria.save();
    //UNA VEZ GUARDADA LA CATEGORIA, GUARDO EL INCENDIO Y RETORNO:
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

module.exports = {
  getSiniestros,
  createSiniestro,
  getSiniestroById,
  updateSiniestro,
  deleteSiniestro,
};
