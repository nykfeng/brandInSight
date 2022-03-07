const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const Brand = require("./models/Brand");
const Contact = require("./models/Contact");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");

// routes
const brands = require("./routes/brands");
const contacts = require("./routes/contacts");

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
app.use(flash());

// ------ middleware for handling flash ----------
// need to define before routes

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ------------ Routes --------------

app.use("/brands", brands);
app.use("/brands/:id/contact", contacts);

// ;------------------------

app.get("/home", homePage);
app.get("/internal", internal);
app.get("/free-user", homePage);

app.get("/createBrand", createBrand);

app.get("/internal/new", async (req, res) => {
  res.render("internal/brands/new");
});

// -------------------------

// ---------------------------

async function homePage(req, res) {
  const brands = await Brand.find({});

  res.render("home", { brands });
}

function internal(req, res) {
  res.render("internal/index");
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
  if (!err.message) err.message = "Something went super wrong!";
  res.status(statusCode).render("internal/error", { error: err });
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
