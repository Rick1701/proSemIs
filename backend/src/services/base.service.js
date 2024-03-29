"use strict";
// Importa el modelo de datos 'User'
const Base = require("../models/base.model.js");
const Uaerea = require("../models/uaerea.model.js");
const Uterrestre = require("../models/uterrestre.model.js");
const Siniestro = require("../models/siniestro.model.js");
const Estado_Base = require("../models/estado_base.model.js");
const { handleError } = require("../utils/errorHandler");
// const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef Base
 * @property {string} _id
 * @property {String} base_descripcion,
 * @property {Number} base_latitud,
 * @property {Number} base_incendios_asistidos
 * @property {mongoose.Schema.Types.ObjectId} base_estado 
 */

/**
 * @name getBases
 * @description Obtiene todos los bases
 * @returns {Promise<Base[]|[]>}
 */
async function getBases() {
  try {
    return await Base.find().exec();
  } catch (error) {
    handleError(error, "Base.service -> getBases");
  }
}

/**
 * @name createBase
 * @description Crea un nuevo Base
 * @param Base {Base} - Objeto con los datos de la base
 * @returns {Promise<Base|null>}
 */
async function createBase(base) {
  // Esta funcion es similar al singup
   try {
    // const { error } = userBodySchema.validate(user);
    // if (error) return null;
    // const { name, email, roles } = user;

    // const userFound = await User.findOne({ email: user.email });
    // if (userFound) return null;

    // const rolesFound = await Role.find({ name: { $in: roles } });
    // const myRole = rolesFound.map((role) => role._id);
    const { base_descripcion,base_latitud,base_incendios_asistidos, base_brigada, base_uaerea, base_uterrestre, /*base_estado*/} = base;
    
    const newBase = new Base({
      base_descripcion,
      base_latitud,
      base_incendios_asistidos,
      base_brigada,
      base_uaerea,
      base_uterrestre,
      //base_estado: estado_base._id
    });
    //estado_base.est_bas_base.push(newBase._id);
    //await estado_base.save();
    return await newBase.save();
  } catch (error) {
    handleError(error, "base.service -> createBase");
  }
}

/**
 * @name getBaseById
 * @description Obtiene un base por su id
 * @param id {string} - Id del base
 * @returns {Promise<Base|null>}
 */
async function getBaseById(id) {
  try {
    return await Base.findById({ _id: id });
  } catch (error) {
    handleError(error, "base.service -> getBaseById");
  }
}


async function asignarBaseAIncendio(baseId, incendioId) {
  try {
    const base = await Base.findById(baseId);
    const incendio = await Siniestro.findById(incendioId);

    if (base && incendio) {
      incendio.sin_bases_operando = base._id;
      await incendio.save();
      return true; // Indica que la asociación se realizó con éxito
    } else {
      return false; // Indica que la base o el incendio no existen
    }
  } catch (error) {
    handleError(error, "base.service -> asignarBaseAIncendio");
    return false; // Indica que ocurrió un error al realizar la asociación
  }
}
/**
 * @name updateBase
 * @description Actualiza una base
 * @param id
 * @param base
 * @returns {Promise<Base|null>}
 */
async function updateBase(id, base) {
  try {
  //  const { error } = userBodySchema.validate(user);
  //  if (error) return null;

    return await Base.findByIdAndUpdate(id, base);
  } catch (error) {
    handleError(error, "base.service -> updateBase");
  }
}

/**
 * @name deleteBase
 * @description Elimina un Base por su id
 * @param id {string} - Id del Base
 * @returns {Promise<Base|null>}
 */
async function deleteBase(id) {
  try {
    return await Base.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "base.service -> deleteBase");
  }
}

//-----------------------------------------------------------------------Estadisticas----------------------------------------------------------|
// Ruta GET para obtener la entidad con proyección de atributos
//router.get('/entidades', async (req, res) => {
 // try {
    // Realizar la consulta y especificar los atributos deseados en el método select()
//    const entidades = await Entidad.find().select('latitud, incendios_asistidos');

//    res.json(entidades);
//  } catch (error) {
    // Manejo de errores
 //   console.error(error);
  //  res.status(500).json({ error: 'Error en el servidor' });
 // }
//});




/**
 * @name getEstadisticaBaseById
 * @description Obtiene la estadística de una Base
 * @param id {string} - Id de la base
 * @returns {Promise<Base|null>}
 */
async function getEstadisticaBaseById(id) {
  try {

    //me mostrara solo lo que quiero ver
    return await Base.findById({ _id: id }).select('base_latitud , base_incendios_asistidos');
   // return await Base.findById({ _id: id });
  } catch (error) {
    handleError(error, "base.service -> getEstadisticaBaseById");
  }
}




//-----------------------------------------------------------------------------------------------------------------------------------------------|

module.exports = {
  getBases,
  createBase,
  getBaseById,
  updateBase,
  deleteBase,
  getEstadisticaBaseById,
  asignarBaseAIncendio
};
