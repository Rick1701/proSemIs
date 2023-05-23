"use strict";
// Importa el modelo de datos 'User'
const Uterrestre = require("../models/uterrestre.model.js");
const Estado_Unidad = require("../models/estado_unidad.model.js");
const Base = require("../models/base.model.js");
const Incidente = require("../models/incidente.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Uterrestre
 * @property {string} _id
 * @property {String} uterrestre_nombre
 */

/**
 * @name getUterrestres
 * @description Obtiene todos los Uterrestres
 * @returns {Promise<Uterrestre[]|[]>}
 */
async function getUterrestres() {
  try {
    return await Uterrestre.find().populate('uterrestre_estado_unidad').populate('uterrestre_base').populate('uterrestre_incidente').exec();
  } catch (error) {
    handleError(error, "Uterrestre.service -> getUterrestres");
  }
}

/**
 * @name createUterrestre
 * @description Crea un nuevo Uterrestre
 * @param uterrestre {Uterrestre} - Objeto con los datos del Uterrestre
 * @returns {Promise<Uterrestre|null>}
 */
async function createUterrestre(uterrestre) {
   try {
    const { uterrestre_nombre, uterrestre_base} = uterrestre;
    const estado_unidad = await Estado_Unidad.findById({ est_uni_descripcion: 'Operativa' });
    const base = await Base.findById(uterrestre_base);
    if(!estado_unidad && !base ){
      handleError(error, "uterrestre.service -> createUterrestre");
    }
    const newUterrestre = new Uterrestre({
      uterrestre_nombre,
      uterrestre_estado_unidad: estado_unidad._id,
      uterrestre_incidente: null,
      uterrestre_base: base._id
    });
    estado_unidad.est_uni_terrestre.push(newUterrestre._id);
    await estado_unidad.save();
    base.base_uterrestre.push(newUterrestre._id);
    await base.save();
    return await newUterrestre.save();
  } catch (error) {
    handleError(error, "uterrestre.service -> createUterrestre");
  }
}

/**
 * @name getUterrestreById
 * @description Obtiene un Uterrestre por su id
 * @param id {string} - Id del Uterrestre
 * @returns {Promise<Uterrestre|null>}
 */
async function getUterrestreById(id) {
  try {
    return await Uterrestre.findById({ _id: id });
  } catch (error) {
    handleError(error, "uterrestre.service -> getUterrestreById");
  }
}

/**
 * @name updateUterrestre
 * @description Actualiza un uterrestre
 * @param id
 * @param uterrestre
 * @returns {Promise<Uterrestre|null>}
 */
async function updateUterrestre(id, uterrestre) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Uterrestre.findByIdAndUpdate(id, uterrestre);
  } catch (error) {
    handleError(error, "uterrestre.service -> updateUterrestre");
  }
}

/**
 * @name deleteUterrestre
 * @description Elimina un Uterrestre por su id
 * @param id {string} - Id del Uterrestre
 * @returns {Promise<Uterrestre|null>}
 */
async function deleteUterrestre(id) {
  try {
    return await Uterrestre.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "uterrestre.service -> deleteUterrestre");
  }
}
async function updateUterrestreEstado(uterrestreId, estado) {
  try {
    const uterrestre = await Uterrestre.findById(uterrestreId);
    if (!uterrestre) {
      handleError(error,"No se encontró la unidad aerea.");
    }
    await _updateEstadoUterrestre(uterrestre, estado);
    return uterrestre;
  } catch (error) {
    handleError(error, "brigadista.service -> updateBrigadistaEstado");
  }
}

async function _updateEstadoUterrestre(uterrestre, estado) {
  try {
    const estadoUterrestre = await Estado_Unidad.findOne({ est_uni_descripcion: estado });
    if (!estadoUterrestre) {
      handleError(error,"No se encontró el estado del brigadista.");
    }

    uterrestre.uterrestre_estado_unidad = estadoUterrestre._id;
    await uterrestre.save();

    // Si el estado es 'No Operativa', se desasocia la unidad del incidente actual
    if (estado === "No Operativa" && uterrestre.uterrestre_incidente) {
      const incidente = await Incidente.findById(uterrestre.uterrestre_incidente);
      if (incidente) {
        incidente.removeUterrestre(uterrestre._id);
      }
    }
  } catch (error) {
    handleError(error, "uterrestre.service -> _updateEstadoUterrestre");
  }
}
module.exports = {
  getUterrestres,
  createUterrestre,
  getUterrestreById,
  updateUterrestre,
  deleteUterrestre,
  updateUterrestreEstado
};
