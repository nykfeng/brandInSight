if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const User = require("./models/User");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");

// app security
const mongoSanitize = require("express-mongo-sanitize");

// our own middleware to verify logged in
const { ifLoggedIn } = require("./middleware/ifLoggedIn");

// routes
const brandRoutes = require("./routes/brands");
const contactRoutes = require("./routes/contacts");
const leadershipRoutes = require("./routes/leaderships");
const userRoutes = require("./routes/users");
const clientRoutes = require("./routes/client");
const internalRoutes = require("./routes/internal");
const historyRoutes = require("./routes/history");

const PORT = process.env.PORT || 3080;
const secret = process.env.SECRET;
// keep the local connection here in case the server won't connect, we can still test
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/brandInSight";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(mongoSanitize());

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setting up the option config for connect-mongo
// Storing session data on mongo instead of in memory
const store = new MongoStore({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 3600, // in total number of seconds
});

store.on("error", function (e) {
  console.log("Session store error", e);
});

const sessionConfig = {
  store,
  name: "session", // use sth so it is not the default connect.sid
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true, // with this, only https is allowed
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //a week's time in millieseconds
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

// -------------- passport -------------
app.use(passport.initialize());
app.use(passport.session());
// In an Express-based application, passport.initialize() middleware
// is required to initialize Passport. If the application uses persistent login sessions,
// passport.session() middleware must also be used.
passport.use(new LocalStrategy(User.authenticate()));
// We did not specify a method called authenticate for the User model
// This is coming from the mongoose plugin that added from passport methods

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// These are also coming from the plugin

app.use(flash());

// ------ middleware for handling flash ----------
// need to define before routes

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ------------ Routes --------------

app.use("/brands", brandRoutes);
app.use("/brands/:id/contact", contactRoutes);
app.use("/brands/:id/leadership", leadershipRoutes);
app.use("/", userRoutes);
app.use("/", clientRoutes);
app.use("/internal", internalRoutes);
app.use("/history", historyRoutes);

// ;------------------------
app.get("/", ifLoggedIn, landingPage);

async function landingPage(req, res) {
  res.render("client/landing");
}

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  // TODO
  // console.log("err---", err); // There is error on the home page
  console.log("Express last error----");
  console.log(err);
  if (!err.message) err.message = "Something went super wrong!";
  res.status(statusCode).render("client/error", { error: err });
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
