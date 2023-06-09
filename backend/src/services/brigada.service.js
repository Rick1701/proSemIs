"use strict";
// Importa el modelo de datos 'brigada'
const Brigada = require("../models/brigada.model.js");
const Base = require("../models/base.model.js");
const Estado_Brigada = require("../models/estado_brigada.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * @typedef Brigada
 * @property {string} _id
 * @property {String} bri_nombre
 * //@property {Number} bri_cantidad
 * @property {String} bri_especialidad
 */

/**
 * @name getBrigadas
 * @description Obtiene todas las brigadas
 * @returns {Promise<Brigada[]|[]>}
 */
async function getBrigadas(){
  try {
    //return await Brigada.find().populate('bri_brigadista', 'brig_rut brig_nombres brig_apellidos brig_estado_brigadista.estab_descripcion').exec();
    return await Brigada.find()
      .populate({
        path: 'bri_brigadista',
        populate: {
          path: 'brig_estado_brigadista',
          select: 'estab_descripcion'
        }
      })
      .populate('bri_estado', 'estabr_descripcion')
      .exec();
  } catch (error) {
    handleError(error, "Brigada.service -> getBrigadas");
  }
}

/**
 * @name createBrigada
 * @description Crea una nueva brigada
 * @param brigada {Brigada} - Objeto con los datos de la brigada
 * @returns {Promise<Brigada|null>}
 */
async function createBrigada(brigada) {
  // Esta funcion es similar al singup
  try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { bri_nombre, bri_especialidad, /*bri_brigadista*/ bri_base/*bri_estado*/ } = brigada;
    const base = await Base.findById(bri_base);
    //const estado_brigada = await Estado_Brigada.findById(bri_estado);
    if (!base /*|| !estado_brigada*/) {
      handleError(error, "brigada.service -> createBrigada");
    }
    const newBrigada = new Brigada({
      bri_nombre,
      bri_especialidad,
      //bri_brigadista,
      bri_base: base._id,
      //bri_estado: estado_brigada._id,
    });
    return await newBrigada.save();
  } catch (error) {
    handleError(error, "brigada.service -> createBrigada");
  }
}

/**
 * @name getBrigadaById
 * @description Obtiene una brigada por su id
 * @param id {string} - Id de la brigada
 * @returns {Promise<Brigada|null>}
 */
async function getBrigadaById(id) {
  try {
    return await Brigada.findById({ _id: id })
    .populate({
      path: 'bri_brigadista',
      populate: {
        path: 'brig_estado_brigadista',
        select: 'estab_descripcion'
      }
    })
    .populate('bri_estado', 'estabr_descripcion')
    .exec();
  } catch (error) {
    handleError(error, "brigada.service -> getBrigadaById");
  }
}

/**
 * @name updateBrigada
 * @description Actualiza una brigada
 * @param id
 * @param brigada
 * @returns {Promise<Brigada|null>}
 */
async function updateBrigada(id, brigada) {
  try {
    //  const { error } = userBodySchema.validate(user);
    //  if (error) return null;

    return await Brigada.findByIdAndUpdate(id, brigada);
  } catch (error) {
    handleError(error, "brigada.service -> updateBrigada");
  }
}

/**
 * @name deleteBrigada
 * @description Elimina una brigada por su id
 * @param id {string} - Id de la brigada
 * @returns {Promise<Brigada|null>}
 */
async function deleteBrigada(id) {
  try {
    return await Brigada.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "brigada.service -> deleteBrigada");
  }
}

/**
 * @name updateBrigadaEstado
 * @description Actualiza el estado de una brigada y verifica el estado de los brigadistas
 * @param brigadaId {string} - Id de la brigada
 * @returns {Promise<Brigada|null>}
 */
async function updateBrigadaEstado(brigadaId) {
  try {
    const brigada = await Brigada.findById(brigadaId);
    if (!brigada) {
      throw new Error("No se encontró la brigada.");
    }
    const brigadistas = brigada.bri_brigadista;
    let parcialmenteDisponible = false;

    for (const brigadista of brigadistas) {
      if (brigadista.brig_estado_brigadista.estab_descripcion === "No Disponible") {
        parcialmenteDisponible = true;
        break;
      }
    }

    const estadoBrigada = parcialmenteDisponible ? "Parcialmente Disponible" : "Totalmente Disponible";
    const estadoBrigadaObj = await Estado_Brigada.findOne({ estabr_descripcion: estadoBrigada });
    if (!estadoBrigadaObj) {
      throw new Error(`No se encontró el estado "${estadoBrigada}" de la brigada.`);
    }

    brigada.bri_estado = estadoBrigadaObj._id;
    await brigada.save();

    return brigada;
  } catch (error) {
    handleError(error, "brigada.service -> updateBrigadaEstado");
  }
}

module.exports = {
  getBrigadas,
  createBrigada,
  getBrigadaById,
  updateBrigada,
  deleteBrigada,
  updateBrigadaEstado,
};
