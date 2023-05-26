const express = require("express");
const router = express.Router();

/* GET /change-locale, dinamico dependiendo de qué reciba */
router.get("/:locale", (req, res, next) => {
  const locale = req.params.locale;

  // Añadimos una cookie en la resuesta que indique y recuerde el nuevo locale -idioma, es o en- al browser
  res.cookie("nodepop-locale", locale, {
    //2 horas de cookie
    maxAge: 1000 * 60 * 60 * 2,
  });

  // responder con una redirección a la página de donde venía la petición -index-
  res.redirect(req.get("referer"));
});

module.exports = router;
