"use strict";
const Incidente = require("../models/incidente.model.js");
const Estado_Incidente = require("../models/estado_incidente.model.js");
const Brigadista = require("../models/brigadista.model.js");
const Uaerea = require("../models/uaerea.model.js");
const Uterrestre = require("../models/uterrestre.model.js");
const { handleError } = require("../utils/errorHandler");

async function getIncidentes() {
  try {
    return await Incidente.find();
  } catch (error) {
    handleError(error, "Incidente.service -> getIncidentes");
  }
}

async function createIncidente(inc_descripcion, inc_brigadista, inc_uaerea, inc_uterrestre) {
  try {
    const estado_incidente = await Estado_Incidente.findOne({ est_inc_descripcion: 'En proceso' });
    if (!estado_incidente) {
      throw new Error("No se encontró el estado de incidente 'En proceso'.");
    }
    let newIncidente;
    if (inc_brigadista) {
      const brigadista = await Brigadista.findById(inc_brigadista);
      if (!brigadista) {
        throw new Error("No se encontró el brigadista.");
      }
      if (brigadista.brig_estado_brigadista.estab_descripcion !== "Disponible") {
        throw new Error("No se puede asociar el incidente. El brigadista no está disponible.");
      }
      newIncidente = new Incidente({
        inc_descripcion,
        inc_brigadista: brigadista._id,
      });
      // Actualizar el estado del brigadista a 'No Disponible'
      await _updateBrigadistaEstado(brigadista, "No Disponible");
    } else if (inc_uaerea) {
      const uaerea = await Uaerea.findById(inc_uaerea);
      if (!uaerea) {
        throw new Error("No se encontró la unidad aérea.");
      }
      newIncidente = new Incidente({
        inc_descripcion,
        inc_uaerea: uaerea._id,
      });
    } else if (inc_uterrestre) {
      const uterrestre = await Uterrestre.findById(inc_uterrestre);
      if (!uterrestre) {
        throw new Error("No se encontró la unidad terrestre.");
      }
      newIncidente = new Incidente({
        inc_descripcion,
        inc_uterrestre: uterrestre._id,
      });
    } else {
      newIncidente = new Incidente({
        inc_descripcion,
      });
    }

    newIncidente.inc_estado = estado_incidente._id;
    return await newIncidente.save();
  } catch (error) {
    handleError(error, "Incidente.service -> createIncidente");
  }
}



async function getIncidenteById(id) {
  try {
    return await Incidente.findById(id);
  } catch (error) {
    handleError(error, "Incidente.service -> getIncidenteById");
  }
}

async function updateIncidente(id, incidente) {
  try {
    const { inc_descripcion, inc_brigadista, inc_uaerea, inc_uterrestre } = incidente;
    const incidenteToUpdate = await Incidente.findById(id);
    if (!incidenteToUpdate) {
      throw new Error("No se encontró el incidente.");
    }

    const estado_incidente = await Estado_Incidente.findOne({ est_inc_descripcion: 'En proceso' });
    if (!estado_incidente) {
      throw new Error("No se encontró el estado de incidente 'En proceso'.");
    }

    if (inc_brigadista) {
      const brigadista = await Brigadista.findById(inc_brigadista);
      if (!brigadista) {
        throw new Error("No se encontró el brigadista.");
      }
      if (brigadista.brig_estado_brigadista.estab_descripcion !== "Disponible") {
        throw new Error("No se puede asociar el incidente. El brigadista no está disponible.");
      }
      incidenteToUpdate.inc_brigadista = brigadista._id;
      // Actualizar el estado del brigadista a 'No Disponible'
      brigadista.updateEstado("No Disponible");
    } else if (inc_uaerea) {
      const uaerea = await Uaerea.findById(inc_uaerea);
      if (!uaerea) {
        throw new Error("No se encontró la unidad aérea.");
      }
      if (uaerea.uaerea_estado_unidad.est_uni_descripcion !== "Operativa") {
        throw new Error("No se puede asociar el incidente. La unidad aérea no está disponible.");
      }
      incidenteToUpdate.inc_uaerea = uaerea._id;
      // Actualizar el estado de la unidad aérea a 'No Disponible'
      uaerea.updateEstado("No Disponible");
    } else if (inc_uterrestre) {
      const uterrestre = await Uterrestre.findById(inc_uterrestre);
      if (!uterrestre) {
        throw new Error("No se encontró la unidad terrestre.");
      }
      if (uterrestre.uterrestre_estado_unidad.est_uni_descripcion !== "Operativa") {
        throw new Error("No se puede asociar el incidente. La unidad terrestre no está disponible.");
      }
      incidenteToUpdate.inc_uterrestre = uterrestre._id;
      // Actualizar el estado de la unidad terrestre a 'No Disponible'
      uterrestre.updateEstado("No Disponible");
    }

    incidenteToUpdate.inc_descripcion = inc_descripcion;
    incidenteToUpdate.inc_estado = estado_incidente._id;

    return await incidenteToUpdate.save();
  } catch (error) {
    handleError(error, "Incidente.service -> updateIncidente");
  }
}

async function deleteIncidente(id) {
  try {
    const incidenteToDelete = await Incidente.findById(id);
    if (!incidenteToDelete) {
      throw new Error("No se encontró el incidente.");
    }

    if (incidenteToDelete.inc_brigadista) {
      const brigadista = await Brigadista.findById(incidenteToDelete.inc_brigadista);
      if (brigadista) {
        brigadista.updateEstado("Disponible");
      }
    } else if (incidenteToDelete.inc_uaerea) {
      const uaerea = await Uaerea.findById(incidenteToDelete.inc_uaerea);
      if (uaerea) {
        uaerea.updateEstado("Operativa");
      }
    } else if (incidenteToDelete.inc_uterrestre) {
      const uterrestre = await Uterrestre.findById(incidenteToDelete.inc_uterrestre);
      if (uterrestre) {
        uterrestre.updateEstado("Operativa");
      }
    }

    return await Incidente.findByIdAndRemove(id);
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
