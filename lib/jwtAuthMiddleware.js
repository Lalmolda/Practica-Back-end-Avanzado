const jwt = require("jsonwebtoken");

// Exportamos módulo con middleware que comprueba el token JWT y protege las rutas en las que lo incluyamos
module.exports = async (req, res, next) => {
  try {
    // recogemos el Token JWT de la cabecera, o del body o de la query-string
    const jwtToken = req.get("Authorization") || req.body.jwt || req.query.jwt;

    // comprobar que me han mandado un jwtToken
    if (!jwtToken) {
      res.status(401).json({
        status: 401,
        message: "No token has been provided, please provide a token",
      });
      next(error);
      return;
    }

    // llamamos al a función verify que comprueba la validez de nuestro token
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.loggedUser = payload._id;

    next();
  } catch (err) {
    if (err.message === "invalid signature") {
      res.status(401).json({ status: 401, message: err.message });
      return;
    }
    next(err);
  }
};
