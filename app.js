var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//const session = require("express-session");
//const MongoStore = require("connect-mongo");
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");
const i18n = require("./lib/i18nConfigure");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const LoginController = require("./controllers/loginController");

var app = express();

require("./lib/connectMongoose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const loginController = new LoginController();

/**
 * Rutas del API  */
app.get("/api/authenticate", loginController.logIn);
app.post("/api/authenticate", loginController.logIn);
app.use("/api/anuncios", jwtAuthMiddleware, require("./routes/api/anuncios"));

//app.use("/users", usersRouter);

/** 
app.use(
  session({
    name: "nodepop-session",
    secret: "fdsñl4093j590430fdsfmdsf",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // expira a las 2 horas de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STR,
    }),
  })
);

*/

/**
 * Rutas del website  */
//ROUTE TO LOGIN IN THE WEBSITE WITHOUT THE API

app.use(i18n.init);
app.use("/change-locale", require("./routes/change-locale"));
app.use("/", indexRouter);
app.get("/login", loginController.index);
app.post("/login", loginController.logIn);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
