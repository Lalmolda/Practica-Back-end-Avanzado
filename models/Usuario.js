const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Esquema del usuario, indicamos que solo haya un email con el parámetro 'unique'.

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

// método estático que encripta el password, que se recibe sin codificar
usuarioSchema.statics.hashPassword = function (plainTextPassword) {
  return bcrypt.hash(plainTextPassword, saltRounds);
};

// método que compara el password del objeto Usuario insanciado con el recibido por el parámetro de la función
usuarioSchema.methods.comparePassword = function (plainTextPassword) {
  return bcrypt.compare(plainTextPassword, this.password);
};

// Creación del modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Exportamos el modelo
module.exports = Usuario;
