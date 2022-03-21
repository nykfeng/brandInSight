if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const Brand = require("./models/Brand");
const Contact = require("./models/Contact");
const User = require("./models/User");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// our own middleware to verify logged in
const { isLoggedIn } = require("./middleware/isLoggedIn");

// routes
const brandRoutes = require("./routes/brands");
const contactRoutes = require("./routes/contacts");
const userRoutes = require("./routes/users");
const clientRoutes = require("./routes/client");
const internalRoutes = require("./routes/internal");

const PORT = process.env.port || 3080;

mongoose.connect("mongodb://localhost:27017/brandInSight", {
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

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -----  session for now, change during production --------
const sessionConfig = {
  secret: "thisneedstobemorecomplicated",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //a week's time in millieseconds
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

// -------------- passport -------------
app.use(passport.initialize());
app.use(passport.session());
// In an Express-based application, passport.initialize() middleware
// is required to initialize Passport. If your application uses persistent login sessions,
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
app.use("/", userRoutes);
app.use("/", clientRoutes);
app.use("/internal", internalRoutes)


// ;------------------------

// app.get("/home", homePage);
// app.get("/internal", isLoggedIn, internal);
app.get("/free-user", homePage);

app.get("/createBrand", createBrand);

app.get("/internal/new", isLoggedIn, async (req, res) => {
  res.render("internal/brands/new");
});

app.get("/signup", (req, res) => {
  res.render("authen/signup");
});



// -------------------------

// ---------------------------

async function homePage(req, res) {
  const brands = await Brand.find({});

  res.render("client/home", { brands });
}

async function internal(req, res) {
  const brands = await Brand.find({});
  res.render("internal/index", { brands });
}

async function createBrand(req, res) {
  // const brand = new Brand({
  //   name: "Nvidia Corp",
  //   website: "www.nvidia.com",
  //   description:
  //     "NVIDIA is a computing platform company, innovating at the intersection of graphics, HPC, and AI.",
  //   employee: {
  //     min: 10000,
  //     max: 15000,
  //   },
  //   headquarters: "Santa Clara",
  // });
  // await brand.save();
  // res.send(brand);
}

// app.use((req, res) => {
//   res.status(404).send("Page not found");
// });

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
  res.status(statusCode).render("internal/error", { error: err });
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
