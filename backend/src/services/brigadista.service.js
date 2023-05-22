"use strict";
// Importa el modelo de datos 'brigadista'
const Brigadista = require("../models/brigadista.model.js");
const Estado_Brigadista = require("../models/estado_brigadista.model.js");
const Brigada = require("../models/brigada.model.js");
const Incidente = require("../models/incidente.model.js");
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
    return await Brigadista.find().populate('brig_estado_brigadista', 'estab_descripcion').populate('brig_brigada', 'bri_nombre').exec();
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
  try {
    const { brig_rut, brig_nombres, brig_apellidos, brig_sexo, brig_edad, brig_brigada } = brigadista;
    const estado_brigadista = await Estado_Brigadista.findOne({ estab_descripcion: 'Disponible' });
      if (!estado_brigadista) {
      throw new Error("No se encontró el estado de brigadista 'Disponible'.");
    }

    const brigada = await Brigada.findById(brig_brigada);
    if (!brigada) {
      throw new Error("No se encontró la brigada.");
    }

    const newBrigadista = new Brigadista({
      brig_rut,
      brig_nombres,
      brig_apellidos,
      brig_sexo,
      brig_edad,
      brig_estado_brigadista: estado_brigadista._id,
      brig_brigada: brigada._id,
      brig_incidente: null,
    });
    estado_brigadista.estab_brigadista.push(newBrigadista._id);
    await estado_brigadista.save();
    brigada.bri_brigadista.push(newBrigadista._id);
    await brigada.save();
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
async function updateBrigadistaEstado(brigadistaId, estado) {
  try {
    const brigadista = await Brigadista.findById(brigadistaId);
    if (!brigadista) {
      throw new Error("No se encontró el brigadista.");
    }
    await _updateEstadoBrigadista(brigadista, estado);
    return brigadista;
  } catch (error) {
    handleError(error, "brigadista.service -> updateBrigadistaEstado");
  }
}

async function _updateEstadoBrigadista(brigadista, estado) {
  try {
    const estadoBrigadista = await Estado_Brigadista.findOne({ estab_descripcion: estado });
    if (!estadoBrigadista) {
      throw new Error("No se encontró el estado del brigadista.");
    }

    brigadista.brig_estado_brigadista = estadoBrigadista._id;
    await brigadista.save();

    // Si el estado es 'No Disponible', se desasocia el brigadista del incidente actual
    if (estado === "No Disponible" && brigadista.brig_incidente) {
      const incidente = await Incidente.findById(brigadista.brig_incidente);
      if (incidente) {
        incidente.removeBrigadista(brigadista._id);
      }
    }
  } catch (error) {
    handleError(error, "brigadista.service -> _updateEstadoBrigadista");
  }
}
module.exports = {
  getBrigadistas,
  createBrigadista,
  getBrigadistaById,
  updateBrigadista,
  deleteBrigadista,
  updateBrigadistaEstado,
};
