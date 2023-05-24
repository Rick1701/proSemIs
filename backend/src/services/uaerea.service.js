"use strict";
// Importa el modelo de datos 'User'
const Uaerea = require("../models/uaerea.model.js");
const Estado_Unidad = require("../models/estado_unidad.model.js");
const Base = require("../models/base.model.js");
const Incidente = require("../models/incidente.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Uaerea
 * @property {string} _id
 * @property {String} uaerea_nombre
 */

/**
 * @name getUaereas
 * @description Obtiene todos los Uaereas
 * @returns {Promise<Uaerea[]|[]>}
 */
async function getUaereas() {
  try {
    return await Uaerea.find()
      .populate('uaerea_estado_unidad' ).exec();
      /*.populate('uarea_base', 'base_descripcion')
      .populate('uarea_incidente', 'inc_descripcion')
      .exec();*/
  } catch (error) {
    handleError(error, "Uaerea.service -> getUaereas");
  }
}

/**
 * @name createUaerea
 * @description Crea un nuevo Uaerea
 * @param uaerea {Uaerea} - Objeto con los datos del Uaerea
 * @returns {Promise<Uaerea|null>}
 */
async function createUaerea(uaerea) {
  try {
    const { uaerea_nombre, uaerea_base } = uaerea;
    const estado_unidad = await Estado_Unidad.findOne({ est_uni_descripcion: 'Operativa' });
    const base = await Base.findById(uaerea_base);
    if(!estado_unidad && !base){
      handleError(error, "uaerea.service -> createUaerea");
    }
    const newUaerea = new Uaerea({
      uaerea_nombre,
      uaerea_estado_unidad: estado_unidad._id,
      uaerea_incidente: null,
      uaerea_base: base._id
    });

    estado_unidad.est_uni_aerea.push(newUaerea._id);
    await estado_unidad.save();
    base.base_uaerea.push(newUaerea._id);
    await base.save();
    return await newUaerea.save();
  } catch (error) {
    handleError(error, "uaerea.service -> createUaerea");
  }
}

/**
 * @name getUaereaById
 * @description Obtiene un Uaerea por su id
 * @param id {string} - Id del Uaerea
 * @returns {Promise<Uaerea|null>}
 */
async function getUaereaById(id) {
  try {
    return await Uaerea.findById({ _id: id });
  } catch (error) {
    handleError(error, "uaerea.service -> getUaereaById");
  }
}

/**
 * @name updateUaerea
 * @description Actualiza un uaerea
 * @param id
 * @param uaerea
 * @returns {Promise<Uaerea|null>}
 */
async function updateUaerea(id, uaerea) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Uaerea.findByIdAndUpdate(id, uaerea);
  } catch (error) {
    handleError(error, "uaerea.service -> updateUaerea");
  }
}

/**
 * @name deleteUaerea
 * @description Elimina un Uaerea por su id
 * @param id {string} - Id del Uaerea
 * @returns {Promise<Uaerea|null>}
 */
async function deleteUaerea(id) {
  try {
    return await Uaerea.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "uaerea.service -> deleteUaerea");
  }
}
async function updateUaereaEstado(uaereaId, estado) {
  try {
    const uaerea = await Uaerea.findById(uaereaId);
    if (!uaerea) {
      throw new Error("No se encontró la unidad aerea.");
    }
    await _updateEstadoUaerea(uaerea, estado);
    return uaerea;
  } catch (error) {
    handleError(error, "brigadista.service -> updateBrigadistaEstado");
  }
}

async function _updateEstadoUaerea(uaerea, estado) {
  try {
    const estadoUaerea = await Estado_Unidad.findOne({ est_uni_descripcion: estado });
    if (!estadoUaerea) {
      throw new Error("No se encontró el estado del brigadista.");
    }

    uaerea.uaerea_estado_unidad = estadoUaerea._id;
    await uaerea.save();

    // Si el estado es 'No Operativa', se desasocia la unidad del incidente actual
    if (estado === "No Operativa" && uaerea.uaerea_incidente) {
      const incidente = await Incidente.findById(uaerea.uaerea_incidente);
      if (incidente) {
        incidente.removeUaerea(uaerea._id);
      }
    }
  } catch (error) {
    handleError(error, "uaerea.service -> _updateEstadoUaerea");
  }
}
module.exports = {
  getUaereas,
  createUaerea,
  getUaereaById,
  updateUaerea,
  deleteUaerea,
  updateUaereaEstado
};
