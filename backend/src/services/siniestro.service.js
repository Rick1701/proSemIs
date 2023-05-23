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
  try {
    const { sin_categoria } = siniestro;
    const categoria = await Categoria.findById(sin_categoria);
    if (!categoria) {
      handleError(error, "siniestro.service -> createSiniestro");
    }

    const newSiniestro = new Siniestro(siniestro);
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
    return await Siniestro.findById({ _id: id }).populate('sin_categoria', 'cat_nivel');
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
      /*if (siniestro.sin_distribucion_fuego == 'copas') {

      } else if (siniestro.sin_distribucion_fuego == 'superficie') {

      } else if (siniestro.sin_distribucion_fuego == 'subsuelo') {

      }*/

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

async function updateSiniestro(id, updates) {
  //Busco, actualizo y devuelvo un documento actualizado de la colección "Siniestro" en la base de datos 
  const siniestro = await Siniestro.findByIdAndUpdate(id, updates, { new: true }).populate('sin_categoria');
  //Verifico si la propiedad 'hitos' del objeto 'siniestro' está definida o no.
  //Si no lo está se inicializa como un arreglo vacío
  if (!siniestro.hitos) {
    siniestro.hitos = [];
  }
  const actualizaciones = Object.keys(updates); //Extraigo las claves de 'updates' y las asigno a la variable 'actualizaciones'
  //console.log(actualizaciones); //Puedo imprimir en la consola las claves de las propiedades actualizadas
  //Ahora creo un nuevo arreglo 'nuevosHitos' con el metodo 'map' en el arreglo 'actualizaciones'
  const nuevosHitos = actualizaciones.map((clave) => {
    return {
      //Para cada clave en 'actualizaciones' creo un objeto 'Date' y 'Descripción'
      fecha: new Date(),
      descripcion: getHitoDescripcion(clave), //Se obtiene llamando a la función 'getHitoDescripcion' pasando la clave como argumento
    };
  });

  //Utilizo el operador de propagación "spread operator" el cual descompone un objeto iterable en sus elementos individuales
  siniestro.hitos.push(...nuevosHitos); //Tomo cada objeto individual dentro del arreglo 'nuevosHitos' y los agrego uno por uno al final del arreglo 'hitos' del objeto siniestro'
  const siniestroGuardado = await siniestro.save(); //Guardo el objeto 'siniestro' actualizado en la base de datos
  console.log('Hitos registrados:', nuevosHitos); //Imprimo en la consola un mensaje junto con el arreglo 'nuevosHitos', lo cual muestra los nuevos hitos generados
  return siniestroGuardado; //Devuelvo el objeto 'siniestroGuardado' que representa al siniestro actualizado
}

//Declaro la función 'getHitoDescripcion' que toma el parametro 'action'
function getHitoDescripcion(action) {
  let descripcion = '';

  //Utilizo una estructura 'switch' para determinar la descripción adecuada según el valor de 'action'
  switch (action) {
    case 'sin_velocidadViento':
      descripcion = 'Actualización de velocidad del viento';
      break;
    case 'sin_temperatura':
      descripcion = 'Actualización de temperatura';
      break;
    case 'sin_humedad':
      descripcion = 'Actualización de humedad';
      break;
    case 'sin_fechaInicio':
      descripcion = 'Actualización de fecha de inicio';
      break;
    case 'sin_fechaTermino':
      descripcion = 'Actualización de fecha de término';
      break;
    case 'sin_latitud':
      descripcion = 'Actualización de latitud';
      break;
    case 'sin_superficie':
      descripcion = 'Actualización de superficie';
      break;
    case 'sin_distribucion_fuego':
      descripcion = 'Actualización de distribución de fuego';
      break;
    case 'sin_categoria':
      descripcion = 'Actualización de categoría';
      break;
    default:
      descripcion = 'Actualización de siniestro';
      break;
  }
  //Devuelvo el valor de la variable 'descripcion' que contiene la descripcion correspondiente al valor de 'action'
  return descripcion;
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
  getEstrategiaSiniestroById
};
