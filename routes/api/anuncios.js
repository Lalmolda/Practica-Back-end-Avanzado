const express = require('express');
const router = express.Router();
const anuncio = require('../../models/anuncios');
const {query, validationResult} = require('express-validator');


/*Tags Existentes

Llamando a la api tags salen todos los tags.
Simplemente hago una query al metodo distinctTags definido 
en el modelo de anuncios con la query de MongoDB distinct.
Llamada: http://localhost:3001/api/tags

*/
router.get('/tags', async (req, res, next) => {
    try {
    const filterByTag = "tag"
    const tags = await anuncio.distinctTags(filterByTag);
    res.json({ Tags: tags });

  }catch (error) {
    next(error);
  }
  });

router.get('/', async (req, res, next) => {
    try {
    // filtros
    const filterByName = req.query.nombre;
    const filterByStatus = req.query.venta;
    const filterByMinPrice = req.query.pminimo;
    const filterByMaxPrice = req.query.pmaximo;
    const filterPrecio = req.query.precio;
    const filterByTag = req.query.tag;
    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;
    // ordenar
    const sort = req.query.sort;
    // selección de campos
    const select = req.query.select;
    const filtro = {};

    //Dejo el código de mi intento de crear un objeto de objetos
    //para meter la expresión regular como también funciona
    //en la consola de MongoDB, resulta que no lo coge por las comillas
    //y al crear los objetos sus propiedades me las mete automáticamente
    //con comillas no se por qué... La query funciona en consola
    // Query intentada: b.anuncios.find({nombre: {"$regex": /^fer/, $options: 'i'}})
    if(filterByName){
      //filterByName+="/";
      //let regEx="/^";
      //regEx+=filterByName;
      //let nameSearch = {};
      //nameSearch = {"$regex": regEx};
      //const optionRegEx = {"$options": 'i'}
      //Object.assign(nameSearch,optionRegEx);
      //const prueba = { "$regex": /^F/};
      //Object.assign(filtro.nombre,nameSearch);
      filtro.nombre = new RegExp('^'+filterByName, "i");
      console.log("FILTRO DE NOMBRE ES: "+filtro.nombre);
    }

    if(filterByStatus){
      filtro.venta=filterByStatus;
    }
    
    if(filterByTag){
      filtro.tag=filterByTag;
    }

    /*Si detecta que se ha pasado un precio mínimo
    y detecta que filtro.precio ha sido ya inicializado,
    lo asigna a filtro.precio con Object.assign, ya que
    si filtro.precio ha sido inicializado significa que ya hay un
    objecto de precio máximo dentro y hay que hacer merge con Object.assign.
    En caso contrario, simplemente asigna el objeto a filtro.precio, inicializándolo.
    */
    if(filterByMinPrice){
      const min = { "$gte": filterByMinPrice };
      if(filtro.precio){
        Object.assign(filtro.precio,min);
      }else{
        filtro.precio=min;
      }
      
    }
    
    /*Equivalente a precio mínimo*/
    if(filterByMaxPrice){
      const max = { "$lte": filterByMaxPrice };
      if(filtro.precio){
        Object.assign(filtro.precio,max);
      }else{
        filtro.precio=max;
      }
    }

   if(filterPrecio){
    precio = {"precio": filterPrecio};
    console.log(precio);
   }
    
    const anuncios = await anuncio.lista(filtro, skip, limit, sort, select);
    res.json({ resultados: anuncios });

  }catch (error) {
    next(error);
  }
  });

  //Método para añadir más anuncios
  router.post('/', async (req, res, next) => {
    try {
      const anuncioData = req.body;
      const ad = new anuncio(anuncioData);
      const anuncioGuardado = await ad.save();
  
      res.json({ result: anuncioGuardado });
  
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;