"use strict";
// Importa el modelo de datos 'User'
const Siniestro = require("../models/siniestro.model.js");
const Categoria = require("../models/categoria.model.js");
const { handleError } = require("../utils/errorHandler");
const Incidente = require("../models/incidente.model.js");
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
    return await Siniestro.find()
      .populate('sin_categoria', 'cat_nivel')
      .populate('sin_incidente', 'inc_descripcion')
      .populate('sin_bases_operando', 'base_descripcion'); // Agrega el populate para obtener la base asociada
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
    
    
    const { sin_velocidadViento, sin_temperatura, sin_humedad, sin_fechaInicio, sin_latitud, sin_superficie, sin_distribucion_fuego /*sin_tipo_bosque, sin_estrategia,sin_incidente*/} = siniestro;


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
      sin_latitud,
      sin_longitud: 30,
      sin_superficie,
      sin_distribucion_fuego,
      sin_estado: 'INICIACIÓN'
      //sin_tipo_bosque
      //sin_incidente: incidente._id
    });

    // Guardar el siniestro en la base de datos
    const siniestroGuardado = await newSiniestro.save();

    // Obtener la estrategia después de guardar el siniestro
    const estrategia = await getEstrategiaSiniestroById(siniestroGuardado._id);

    // Actualizar el campo sin_estrategia en el objeto siniestro
    siniestroGuardado.sin_estrategia = estrategia;
    // Crear el hito con la información actualizada
    const hito = {
      fecha: new Date(),
      descripcion: "Inicio del Siniestro",
      siniestroCompleto: {
        ...siniestroGuardado.toObject()
      },
    };

    // Agregar el hito al array de hitos
    siniestroGuardado.hitos.push(hito);

    // Guardar el siniestro con el hito
    return await siniestroGuardado.save();
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
    let estrategia;
    //Variable para determinar la complejidad de un incendio:
    var complejidadSiniestro = 0;

    //Búsqueda de un incendio por Id:
    const siniestro = await getSiniestroById(id);

    //Obtención de array de categorias con sus respectivos parámetros:
    const categorias = await Categoria.find();

    //Análisis de las variables del entorno:
    if (siniestro) {
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

      console.log("Nivel de velocidad del viento:", nivelVelViento);
      console.log("Nivel de humedad:", nivelHumedad);
      console.log("Nivel de temperatura:", nivelTemperatura);
      console.log("Nivel de superficie:", nivelSuperficie);
      
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

      console.log("Complejidad del siniestro:", complejidadSiniestro);


      //Datos que sirven para las estadisticas:
      
      for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        if (categoria.cat_nivel == complejidadSiniestro) {
          categoria.cat_incendio.push(id);
          siniestro.sin_categoria = categoria._id;
          await categoria.save(); // Guarda el objeto de categoría individual
          break; // Sale del bucle después de guardar la categoría
        }
      }
      

      //ESTRATEGIA CONSIDERA: BRIGADAS, UNIDADES, MATERIALES Y GESTIONES (PENDIENTE: UBICACIÓN).

      if (complejidadSiniestro == 1) {
        if (siniestro.sin_distribucion_fuego.length === 1 && siniestro.sin_distribucion_fuego[0] === 'copas') {
          estrategia = "Ante un siniestro de nivel 1 con distribución del fuego en las copas de los árboles, se sugiere desplegar brigadas especializadas en trabajos en altura y el uso de herramientas manuales como motosierras para poda selectiva. Identificar y focalizar los árboles o grupos de árboles en llamas y extinguirlos, evitando la propagación del fuego a otras áreas.";
        } else if (siniestro.sin_distribucion_fuego.includes('copas') && siniestro.sin_distribucion_fuego.includes('superficie') && siniestro.sin_distribucion_fuego.includes('subsuelo')) {
          estrategia = 'Ante un siniestro de nivel 1 con distribución del fuego en las copas de los árboles, en la superficie y en el subsuelo simultáneamente, se sugiere controlar las llamas en las copas de los árboles identificando y focalizando los árboles o grupos de árboles en llamas, extinguiéndolos de manera selectiva para evitar la propagación del fuego a otras áreas. Se requieren brigadas especializadas en trabajos en altura y el uso de herramientas específicas, como motosierras para poda selectiva en alturas. Al mismo tiempo, es necesario desplegar brigadas especializadas en tácticas de ataque directo en la superficie y el subsuelo, utilizando herramientas manuales como mochilas contra incendios, mangueras y equipos de bomberos para combatir el fuego desde la base.';
        } else if (siniestro.sin_distribucion_fuego.includes('superficie') || siniestro.sin_distribucion_fuego.includes('subsuelo') ) {
          estrategia = 'Ante un siniestro de nivel 1 con distribución del fuego en la superficie y en el subsuelo simultáneamente, se sugiere desplegar brigadas especializadas en ataque directo y uso de herramientas manuales como palas, mangueras o motosierras (para poda selectiva) y equipos de bomberos para combatir el fuego localmente.';
        }
      } else if (complejidadSiniestro == 2) {
        if (siniestro.sin_distribucion_fuego.length === 1 && siniestro.sin_distribucion_fuego[0] === 'copas') {
          estrategia = 'Ante un siniestro de nivel 2 con distribución del fuego en las copas de los árboles, se sugiere desplegar brigadas especializadas en trabajos en alturas y manejo de unidades aéreas tales como aviones cisterna y helicópteros equipados con sistemas de descarga de agua.';
        } else if (siniestro.sin_distribucion_fuego.includes('copas') && siniestro.sin_distribucion_fuego.includes('superficie') && siniestro.sin_distribucion_fuego.includes('subsuelo')) {
          estrategia = 'Ante un siniestro de nivel 2 con distribución del fuego en las copas de los árboles, en la superficie y en el subsuelo simultáneamente, se sugiere desplegar brigadas especializadas en el manejo de unidades aéreas tales como aviones cisterna y helicópteros equipados con sistemas de descarga de agua. Combinar con despliegue de brigadas y unidades terrestres especializadas en ataque directo utilizando herramientas manuales como mochilas contra incendios, mangueras y equipos de bomberos. Se recomienda coordinar esfuerzos desde ambos frentes (aereo y terrestre), identificar y focalizar los árboles o grupos de árboles en llamas y extinguirlos de manera selectiva, evitando la propagación del fuego a otras áreas. Asimismo, se deben priorizar la creación de cortafuegos y líneas de defensa in situ.';
        } else if (siniestro.sin_distribucion_fuego.includes('superficie') || siniestro.sin_distribucion_fuego.includes('subsuelo') ) {
          estrategia = 'Ante un siniestro de nivel 2 con distribución del fuego en la superficie y en el subsuelo simultáneamente, se sugiere desplegar brigadas especializadas en ataque directo y uso de herramientas manuales como palas, mochilas contra incendios, mangueras, motosierras (para poda selectiva) y equipos de bomberos. Priorizar la creación de cortafuegos y líneas de defensa in situ, como también la rotación de brigadas expuestas a altas temperaturas. Solicitar apoyo logístico regional.';
        }
      } else if (complejidadSiniestro == 3) {
        if (siniestro.sin_distribucion_fuego.length === 1 && siniestro.sin_distribucion_fuego[0] === 'copas') {
          estrategia = 'Ante un siniestro de nivel 3 con distribución del fuego en las copas de los árboles, se sugiere identificar y focalizar los árboles o grupos de árboles en llamas y extinguirlos de manera selectiva, Desplegar brigadas especializadas en el manejo de unidades aereas (de nivel 2). Incorporar uso de helibombardero equipado con tanque de agua o retardante de fuego para atacar el fuego en las copas de los árboles.';
        } else if (siniestro.sin_distribucion_fuego.includes('copas') && siniestro.sin_distribucion_fuego.includes('superficie') && siniestro.sin_distribucion_fuego.includes('subsuelo')) {
          estrategia = 'Ante un siniestro de nivel 3 con distribución del fuego en las copas de los árboles, en la superficie y en el subsuelo simultáneamente, se sugiere establecer un centro de comando y control para coordinar el uso de unidades aéreas con brigadas y unidades terrestres especializadas en ataque directo y uso de maquinarias pesadas. Las unidades aéreas (aviones, helicopteros y helibombarderos) deben utilizar agua o retardante de fuego. Se deben implementar tácticas terrestres de extinción y contención más agresivas, priorizando la defensa perimetral. Solicitar apoyo logístico nacional.';
        } else if (siniestro.sin_distribucion_fuego.includes('superficie') || siniestro.sin_distribucion_fuego.includes('subsuelo') ) {
          estrategia = 'Ante un siniestro de nivel 3 con distribución del fuego en la superficie y en el subsuelo simultáneamente, se sugiere establecer un centro de comando y control para coordinar todas las operaciones terrestres, Desplegar brigadas especializadas en ataque directo y uso de maquinarias pesadas, implementar tácticas terrestres de extinción más agresivas y contención (defensa más allá del perímetro del incendio). Solicitar apoyo logístico nacional.';
        }
      } else {
        if (siniestro.sin_distribucion_fuego.length === 1 && siniestro.sin_distribucion_fuego[0] === 'copas') {
          estrategia = 'Ante un siniestro de nivel 4 con distribución del fuego en las copas de los árboles, se sugiere desplegar todos los recursos aéreos disponibles (brigadas y unidades). Implementar ataque aéreo intensivo con retardante de fuego u otros agentes químicos en las copas de los árboles. Se deben realizar múltiples pasadas para saturar la zona afectada. Solicitar gestión de aeronaves con mayores capacidades en el extranjero.';
        } else if (siniestro.sin_distribucion_fuego.includes('copas') && siniestro.sin_distribucion_fuego.includes('superficie') && siniestro.sin_distribucion_fuego.includes('subsuelo')) {
          estrategia = 'Ante un siniestro de nivel 4 con distribución del fuego en las copas de los árboles, en la superficie y en el subsuelo simultáneamente, se sugiere establecer un centro de comando y control para determinar acciones contundentes y coordinadas. Para las copas de los árboles, se recomienda desplegar todas las unidades aéreas disponibles y realizar ataque aéreo intensivo con retardante de fuego u otros agentes químicos. Se deben realizar múltiples pasadas para saturar la zona afectada. Además, se sugiere solicitar la gestión de aeronaves con mayores capacidades en el extranjero. Se requieren utilizar maquinarias o unidades especializadas y brigadas de respuesta enérgica y agresiva para controlar y extinguir el incendio. Asimismo, se recomienda solicitar la implementación del "estado de emergencia" y buscar apoyo logístico a nivel internacional.';
        } else if (siniestro.sin_distribucion_fuego.includes('superficie') || siniestro.sin_distribucion_fuego.includes('subsuelo') ) {
          estrategia = 'Ante un siniestro de nivel 4 con distribución del fuego en la superficie y en el subsuelo, se sugiere establecer un centro de comando para movilizar y desplegar y coordinar totalidad de brigadas y unidades terrestres e implementar tácticas agresivas que incluyan uso de maquinaria especializada y pesada de respuesta enérgica para controlar y extinguir el incendio. Solicitar a las autoridades la implementación del "estado de emergencia" como también apoyo logístico internacional.';
        }
      }

      console.log("Estrategia: ", estrategia);
      siniestro.sin_estrategia = estrategia;
      siniestro.save();
      return await estrategia;

    }
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
  try{
    //Busco, actualizo y devuelvo un documento actualizado de la colección "Siniestro" en la base de datos 
    const siniestro = await Siniestro.findByIdAndUpdate(id, updates, { new: true }).populate('sin_categoria');
    
    
    //Verifico si la propiedad 'hitos' del objeto 'siniestro' está definida o no.
    //Si no lo está se inicializa como un arreglo vacío
    if (!siniestro.hitos) {
      siniestro.hitos = [];
    }
    
    // Validar si 'sin_fechaTermino' ya está definida en el siniestro
    if (!siniestro.sin_fechaTermino) {
      // Si 'sin_fechaTermino' no está definida, entonces cambiar el estado a 'PROPAGACIÓN'
      siniestro.sin_estado = 'PROPAGACIÓN';
    }
    else{
      siniestro.sin_estado = 'EXTINCIÓN';
    }
    // Guardar los datos cambiados del siniestro
    const siniestroGuardado = await siniestro.save();

    // Obtener la estrategia actualizada y guardar los nuevos parámetros del siniestro en el método 'getEstrategiaSiniestroById'
    const estrategia = await getEstrategiaSiniestroById(siniestroGuardado._id);

    const actualizaciones = Object.keys(updates); //Extraigo las claves de 'updates' y las asigno a la variable 'actualizaciones'
    //Ahora creo un nuevo arreglo 'nuevosHitos' con el metodo 'map' en el arreglo 'actualizaciones'
    const nuevosHitos = actualizaciones.map((clave) => {
      return {
        //Para cada clave en 'actualizaciones' creo un objeto 'Date' y 'Descripción'
        fecha: new Date(),
        descripcion: getHitoDescripcion(clave), //Se obtiene llamando a la función 'getHitoDescripcion' pasando la clave como argumento
        siniestroCompleto: { ...siniestroGuardado.toObject(), sin_estrategia: estrategia }, // Copia del objeto siniestro en el momento actual con la nueva estrategia
      };
    });

    // Agregar el nuevo hito al arreglo de hitos del objeto siniestro
    siniestroGuardado.hitos.push(...nuevosHitos);

    // Guardar el siniestro con el nuevo hito en la base de datos
    const siniestroConHitoGuardado = await siniestroGuardado.save();

    console.log('Hito registrado:', nuevosHitos); // Imprimir en la consola un mensaje junto con el nuevo hito registrado
    return siniestroConHitoGuardado; // Devuelvo el objeto 'siniestroConHitoGuardado' que representa al siniestro actualizado con el nuevo hito
  } catch (error) {
    handleError(error, "siniestro.service -> updateSiniestro");
  }
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








//--------------------------------------------------------------- ESTADISTICAS METODOS ----------------------------------------------------------------]


/**
 * @name getEstadisticas
 * @description
 * @returns {Promise<Siniestro[]|[]>}
 */
/*
async function getEstadisticas() {
  try {
    return await Siniestro.find();
  } catch (error) {
    handleError(error, "Siniestro.service -> getEstadisticas");
  }
}
*/

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
  //getEstadisticas,

};

