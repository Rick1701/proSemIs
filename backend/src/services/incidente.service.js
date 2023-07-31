"use strict";
const Incidente = require("../models/incidente.model.js");
const Estado_Incidente = require("../models/estado_incidente.model.js");
const Brigadista = require("../models/brigadista.model.js");
const Uaerea = require("../models/uaerea.model.js");
const Uterrestre = require("../models/uterrestre.model.js");
const Siniestro = require("../models/siniestro.model.js");
const { handleError } = require("../utils/errorHandler");
const { updateBrigadistaEstado } = require("./brigadista.service.js");
const { updateUaereaEstado } = require("./uaerea.service.js");
const { updateUterrestreEstado } = require("./uterrestre.service.js");

async function getIncidentes() {
  try {
    return await Incidente.find()
      .populate("inc_siniestro", "sin_numeroIncendio")
      .populate("inc_brigadista","brig_rut")
      .populate("inc_estado", "est_inc_descripcion")
      .populate("inc_uaerea","uaerea_nombre")
      .populate("inc_uterrestre","uterrestre_nombre")
      .exec();
  } catch (error) {
    handleError(error, "Incidente.service -> getIncidentes");
  }
}

async function createIncidente(
  inc_descripcion,
  inc_brigadista,
  inc_uaerea,
  inc_uterrestre,
  inc_siniestro
) {
  try {
    const estado_incidente = await Estado_Incidente.findOne({
      est_inc_descripcion: "En proceso",
    });
    if (!estado_incidente) {
      return { error: "No se encontró el estado de incidente 'En proceso'." };
    }

    let newIncidente;
    if (inc_brigadista) {
      const brigadista = await Brigadista.findById(inc_brigadista)
        .populate("brig_estado_brigadista")
        .exec();
      if (!brigadista) {
        return { error: "No se encontró el brigadista." };
      }

      if (brigadista.brig_estado_brigadista.estab_descripcion !== "Disponible") {
        return {
          error: "No se puede asociar el incidente. El brigadista no está disponible.",
        };
      }

      newIncidente = new Incidente({
        inc_descripcion,
        inc_brigadista: brigadista._id,
        inc_siniestro: inc_siniestro,
      });
      // Actualizar el estado del brigadista a 'No Disponible'
      await updateBrigadistaEstado(brigadista, "No Disponible");

      // Guardar la _id del incidente en el modelo del brigadista asociado
      if (brigadista.brig_incidente) {
        brigadista.brig_incidente.push(newIncidente._id);
      } else {
        brigadista.brig_incidente = [newIncidente._id];
      }
      await brigadista.save();
    } else if (inc_uaerea) {
      const uaerea = await Uaerea.findById(inc_uaerea)
        .populate("uaerea_estado_unidad")
        .exec();
      if (!uaerea) {
        return { error: "No se encontró la unidad aérea." };
      }

      if (uaerea.uaerea_estado_unidad.est_uni_descripcion !== "Operativa") {
        return {
          error: "No se puede asociar la unidad aérea. La unidad aérea no está operativa.",
        };
      }

      // Actualizar el estado de la unidad aérea a 'No Operativa'
      await updateUaereaEstado(uaerea, "No Operativa");
      newIncidente = new Incidente({
        inc_descripcion,
        inc_siniestro: inc_siniestro,
      });

      // Guardar la _id del incidente en el modelo de la unidad asociada
      if (uaerea.uni_incidente) {
        uaerea.uni_incidente.push(newIncidente._id);
      } else {
        uaerea.uni_incidente = [newIncidente._id];
      }
      await uaerea.save();
    } else if (inc_uterrestre) {
      const uterrestre = await Uterrestre.findById(inc_uterrestre)
        .populate("uterrestre_estado_unidad")
        .exec();
      if (!uterrestre) {
        return { error: "No se encontró la unidad terrestre." };
      }

      if (uterrestre.uterrestre_estado_unidad.est_uni_descripcion !== "Operativa") {
        return {
          error: "No se puede asociar la unidad terrestre. La unidad terrestre no está operativa.",
        };
      }

      // Actualizar el estado de la unidad terrestre a 'No Operativa'
      await updateUterrestreEstado(uterrestre, "No Operativa");
      newIncidente = new Incidente({
        inc_descripcion,
        inc_siniestro: inc_siniestro,
      });

      // Guardar la _id del incidente en el modelo de la unidad asociada
      if (uterrestre.uni_incidente) {
        uterrestre.uni_incidente.push(newIncidente._id);
      } else {
        uterrestre.uni_incidente = [newIncidente._id];
      }
      await uterrestre.save();
    } else {
      newIncidente = new Incidente({
        inc_descripcion,
        inc_siniestro: inc_siniestro,
      });
    }

    newIncidente.inc_estado = estado_incidente._id;
    return await newIncidente.save();
  } catch (error) {
    handleError(error, "Incidente.service -> createIncidente");
    return { error: "Ocurrió un error al crear el incidente." };
  }
}

async function getIncidenteById(id) {
  try {
    return await Incidente.findById(id)
      .populate("inc_siniestro")
      .populate("inc_brigadista", "brig_nombres brig_apellidos brig_rut")
      .exec();
  } catch (error) {
    handleError(error, "Incidente.service -> getIncidenteById");
  }
}

async function updateIncidente(id, incidente) {
  try {
    // Código para actualizar el incidente (no se incluye en esta respuesta)
  } catch (error) {
    handleError(error, "Incidente.service -> updateIncidente");
  }
}

async function deleteIncidente(id) {
  try {
    // Código para eliminar el incidente (no se incluye en esta respuesta)
  } catch (error) {
    handleError(error, "Incidente.service -> deleteIncidente");
  }
}

module.exports = {
  getIncidentes,
  createIncidente,
  getIncidenteById,
  updateIncidente,
  deleteIncidente,
};
