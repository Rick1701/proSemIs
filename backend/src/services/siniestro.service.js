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
 * @property {mongoose.Schema.Types.ObjectId} sin_categoria
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
    const { sin_velocidadViento, sin_temperatura, sin_humedad, sin_fechaInicio, sin_fechaTermino, sin_latitud, sin_superficie, sin_distribucion_fuego, sin_tipo_bosque} = siniestro;

    //Buscar la instancia de Categoría existente en base al ID proporcionado en body:
    //const categoria = await Categoria.findById(sin_categoria);
    //if(!categoria){
    //  handleError(error, "siniestro.service -> createSiniestro");
    //}

    const newSiniestro = new Siniestro({
      sin_velocidadViento,
      sin_temperatura,
      sin_humedad,
      sin_fechaInicio,
      sin_fechaTermino,
      sin_latitud,
      sin_superficie,
      sin_distribucion_fuego,
      sin_tipo_bosque
      //sin_categoria: categoria._id,
    });
    //INSERTO LA ID DEL INCENDIO EN LA CATEGORIA:
    //categoria.cat_incendio.push(newSiniestro._id);
    //UNA VEZ INSERTADA LA ID DEL INCENDIO EN LA CATEGORIA, GUARDO LA CATEGORIA:
    //await categoria.save();
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
 * @name getEstrategiaSiniestroById
 * @description Obtiene la estrategia dado un siniestro por su id y retorna un mensaje de estrategia
 * @param id {string} - Id del siniestro
 * @returns {Promise<Siniestro|{ message: string }>}
 */
async function getEstrategiaSiniestroById(id) {
  try {
    //Variables del entorno y sus matices:
    var nivelVelViento = 0;
    var nivelHumedad = 0;
    var nivelTemperatura = 0;
    var nivelSuperficie = 0;

    //Variable para determinar la complejidad de un incendio:
    var complejidadSiniestro = 0;

    //Búsqueda de un incendio por Id:
    const siniestro = await getSiniestroById(id);

    //Obtención de array de categorias con sus respectivos parámetros:
    const categorias = await Categoria.find();

    //Análisis de las variables del entorno:
    //if (siniestro) {
      if (siniestro.sin_velocidadViento >= 0 && siniestro.sin_velocidadViento <= 10) {
        nivelVelViento = 1;
      } else if (siniestro.sin_velocidadViento > 10 && siniestro.sin_velocidadViento <= 20) {
        nivelVelViento = 2;
      } else if (siniestro.sin_velocidadViento > 20 && siniestro.sin_velocidadViento <= 30) {
        nivelVelViento = 3;
      } else if (siniestro.sin_velocidadViento > 30 && siniestro.sin_velocidadViento <= 70) {
        nivelVelViento = 4;
      }

      if (siniestro.sin_humedad <= 100 && siniestro.sin_humedad >= 60) {
        nivelHumedad = 1;
      } else if (siniestro.sin_humedad < 60 && siniestro.sin_humedad >= 40) {
        nivelHumedad = 2;
      } else if (siniestro.sin_humedad < 40 && siniestro.sin_humedad >= 30) {
        nivelHumedad = 3;
      }  else if (siniestro.sin_humedad < 30 && siniestro.sin_humedad >= 10) {
        nivelHumedad = 4;
      }

      if (siniestro.sin_temperatura >= 0 && siniestro.sin_temperatura <= 10) {
        nivelTemperatura = 1;
      } else if (siniestro.sin_temperatura > 10 && siniestro.sin_temperatura <= 20) {
        nivelTemperatura = 2;
      } else if (siniestro.sin_temperatura > 20 && siniestro.sin_temperatura <= 30) {
        nivelTemperatura = 3;
      } else if (siniestro.sin_temperatura > 30 && siniestro.sin_temperatura <= 42) {
        nivelTemperatura = 4;
      }

      if (siniestro.sin_superficie >= 0 && siniestro.sin_superficie <= 5) {
        nivelSuperficie = 1;
      } else if (siniestro.sin_superficie > 5 && siniestro.sin_superficie <= 25) {
        nivelSuperficie = 2;
      } else if (siniestro.sin_superficie > 25 && siniestro.sin_superficie <= 45) {
        nivelSuperficie = 3;
      } else if (siniestro.sin_superficie > 45 && siniestro.sin_superficie <= 1000000) {
        nivelSuperficie = 4;
      }
      
      //Determinación complejidad del siniestro:

      if (nivelVelViento + nivelHumedad + nivelTemperatura + nivelSuperficie == 4) {
        complejidadSiniestro = 1;
      }else if ((nivelVelViento + nivelHumedad + nivelTemperatura + nivelSuperficie > 4) && (nivelVelViento + nivelHumedad + nivelTemperatura + nivelSuperficie <= 8)){
        complejidadSiniestro = 2;
      } else if ((nivelVelViento + nivelHumedad + nivelTemperatura + nivelSuperficie > 8) && (nivelVelViento + nivelHumedad + nivelTemperatura + nivelSuperficie <= 12)){
        complejidadSiniestro = 3;
      } else if ((nivelVelViento + nivelHumedad + nivelTemperatura + nivelSuperficie > 12) && (nivelVelViento + nivelHumedad + nivelTemperatura + nivelSuperficie <= 16)){
        complejidadSiniestro = 4;
      }

      //Asignación del incendio a una categoría
      /*categorias.forEach((categoria)=>{
        if(categoria.cat_nivel == complejidadSiniestro){
          categoria.cat_incendio.push(id);
          siniestro.sin_categoria = categoria._id;
          return categorias.save();
        }
      });*/
    

      for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        if (categoria.cat_nivel == complejidadSiniestro) {
          categoria.cat_incendio.push(id);
          siniestro.sin_categoria = categoria._id;
          await categoria.save(); // Guarda el objeto de categoría individual
          break; // Sale del bucle después de guardar la categoría
        }
      }
      

      //CONSIDERAR CANTIDAD DE BRIGADAS, UNIDADES Y TIPO DE UNIDADES PARA DETERMINAR ESTRATEGIA

      if (siniestro.sin_distribucion_fuego === 'copas' && comlpejidadSiniestro == 1) {
        estrategia = 'Aplicar técnicas de combate aéreo y enfocarse en controlar el fuego en la parte superior de los árboles.';
      } else if ((siniestro.sin_distribucion_fuego === 'copas' && comlpejidadSiniestro == 2)) {
        estrategia = 'Aplicar técnicas de combate aéreo y enfocarse en controlar el fuego en la parte superior de los árboles.';
      } else if (siniestro.sin_distribucion_fuego === 'copas' && comlpejidadSiniestro == 3) {
        estrategia = 'Aplicar técnicas de combate aéreo y enfocarse en controlar el fuego en la parte superior de los árboles.';
      } else if (siniestro.sin_distribucion_fuego === 'copas' && comlpejidadSiniestro == 4) {

      }

      if (siniestro.sin_distribucion_fuego === 'superficie' && comlpejidadSiniestro == 1) {
        estrategia = 'Utilizar técnicas de combate terrestre y enfocarse en controlar el fuego en la superficie del suelo.';
      } else if ((siniestro.sin_distribucion_fuego === 'superficie' && comlpejidadSiniestro == 2)) {
        estrategia = 'Utilizar técnicas de combate terrestre y enfocarse en controlar el fuego en la superficie del suelo.';
      } else if (siniestro.sin_distribucion_fuego === 'superficie' && comlpejidadSiniestro == 3) {
        estrategia = 'Utilizar técnicas de combate terrestre y enfocarse en controlar el fuego en la superficie del suelo.';
      } else if (siniestro.sin_distribucion_fuego === 'superficie' && comlpejidadSiniestro == 4) {

      }

      if (siniestro.sin_distribucion_fuego === 'subsuelo' && comlpejidadSiniestro == 1) {
        estrategia = 'Emplear técnicas de combate subterráneo y enfocarse en controlar el fuego que se encuentra bajo la superficie del suelo.';
      } else if ((siniestro.sin_distribucion_fuego === 'subsuelo' && comlpejidadSiniestro == 2)) {
        estrategia = 'Emplear técnicas de combate subterráneo y enfocarse en controlar el fuego que se encuentra bajo la superficie del suelo.';
      } else if (siniestro.sin_distribucion_fuego === 'subsuelo' && comlpejidadSiniestro == 3) {
        estrategia = 'Emplear técnicas de combate subterráneo y enfocarse en controlar el fuego que se encuentra bajo la superficie del suelo.';
      } else if (siniestro.sin_distribucion_fuego === 'subsuelo' && comlpejidadSiniestro == 4) {

      }

    //}
    //else {
    //
    //}
  } catch (error) {
      handleError(error, "siniestro.service -> getSiniestroByIdWrapper");
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
/*
async function getSumaTotal() {
  try {
    const suma = await Siniestro.aggregate([{ $group: { _id: null, total: { $sum: "$sin_numeroIncendio" } } }]);
    return suma[0].total;
  } catch (error) {
    throw new Error(error.message);
  }
}
*/



/*

  @name sumarCantidadIDs
  @description Realiza la sumatoria de los ID de las entidades
  @returns {Promise<number|null>}

async function getSumarIncendio() {
  try {
    const sum = siniestros.reduce((total, siniestro) => total + siniestro._id, 0);
    return sum;
  } catch (error) {
    handleError(error, "siniestro.service -> getSumarIncendio");
  }
}


async function getEstadisticaCopaById(id) {
  try {

// Retorna el resultado de la estadística solo con los atributos deseados:(separar con espacio de las comas para que funcione)
  return await Siniestro.findById({ _id: id }).select(' sin_distribucion_fuego , sin_categoria ');

    //return await Siniestro.findById({ _id: id });
  } catch (error) {
    handleError(error, "siniestro.service -> getEstadisticaCopaById");
  }
}
*/


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

// Retorna el resultado de la estadística solo con los atributos deseados:(separar con espacio de las comas para que funcione)
  return await Siniestro.findById({ _id: id }).select('sin_velocidadViento , sin_temperatura , sin_humedad , sin_latitud , sin_superficie');

    //return await Siniestro.findById({ _id: id });
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
  getEstrategiaSiniestroById,
  getEstadisticaSiniestroById,
  //getEstadisticaSiniestros,
  //getEstadisticaCopaById,
  //getSumarIncendio
  //getSumaTotal
};
