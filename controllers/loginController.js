const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

class LoginController {
  index(req, res, next) {
    res.locals.error = "";
    res.locals.email = "";
    res.render("login");
  }

  async logIn(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscamos el usuario en la BBDD filtrando por el email
      const usuario = await Usuario.findOne({ email: email });

      // Comparamos el password usando el metodo comparepwassword, que devuelve promesa.
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.json({ error: "Wrong username or password" });
        console.log(
          "ENTRO Y PASS ES " + password + " y email es: " + req.body.email
        );
        return;
      }

      // creaamos un token JWT con el _id del usuario dentro si el usuario existe y el pass coincide
      const token = await jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      //respondemos con un json del jwt token
      res.json({ jwt: token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
