const mongoose = require('mongoose');


// Defining Anuncio schema
const anuncioSchema = new mongoose.Schema(
    { nombre: String,  
    venta: Boolean, //se vende true.
    precio: Number,
    foto: String,
    tag: Array,
    }
)

//Static method anuncio

anuncioSchema.statics.lista = function(filtro, skip, limit, sort, select) {
    const query = anuncio.find(filtro); // thenables
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(select)
    return query.exec();
  }

  //Static method que saca los distintos tags unicos de todos los anuncios.
  anuncioSchema.statics.distinctTags = function(tag) {
    const query = anuncio.distinct(tag); // thenables
    return query.exec();
  }

// Defining Anuncio model
const anuncio = mongoose.model('anuncio', anuncioSchema);

// exportar el modelo
module.exports = anuncio;