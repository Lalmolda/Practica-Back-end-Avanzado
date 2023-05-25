"use strict";
require("dotenv").config();

// Require mongoose module
const connection = require("../lib/connectMongoose");
const anuncio = require("../models/anuncios");
const usuario = require("../models/Usuario");

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  // inicializamos colección de anuncios
  await initAnuncios();

  await initUsuarios();

  connection.close();
}

async function initAnuncios() {
  // borrar todos los documentos de la colección de anuncios
  const deleted = await anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear anuncios iniciales
  var countInserted = 0;
  const regs = 10;
  for (let i = 0; i < regs; i++) {
    const inserted = await anuncio.insertMany([
      {
        nombre: "Balon",
        venta: true,
        precio: 48.3,
        foto: "images/balon.jpg",
        tag: "work",
      },
      {
        nombre: "Sofa",
        venta: true,
        precio: 199.99,
        foto: "images/sofa.jpg",
        tag: "lifestyle",
      },
      {
        nombre: "Iphone",
        venta: true,
        precio: 1199.99,
        foto: "images/iphone.jpg",
        tag: ["mobile", "lifestyle"],
      },
      {
        nombre: "Ferrari",
        venta: false,
        precio: 234000,
        foto: "images/ferrari.jpg",
        tag: ["motor", "lifestyle"],
      },
    ]);
    countInserted++;
  }
  countInserted = countInserted * 4;
  console.log("Creados " + countInserted + " anuncios");
}

async function initUsuarios() {
  // Primero eliminamos los actuales usuarios
  const deleted = await usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios
  const inserted = await usuario.insertMany([
    {
      email: "user@example.com",
      password: await usuario.hashPassword("1234"),
    },
  ]);
  console.log(`Creados ${inserted.length} usuarios.`);
}
