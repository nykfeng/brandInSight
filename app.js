const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const Brand = require("./models/Brand");
const Contact = require("./models/Contact");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const Joi = require("joi");
const { brandSchema, contactSchema } = require("./utils/validationSchema");
const { resourceUsage } = require("process");

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

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/home", homePage);
app.get("/internal", internal);
app.get("/free-user", homePage);

app.get("/createBrand", createBrand);

// ;------------------------
const validateBrand = (req, res, next) => {
  const { error } = brandSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get("/brands", async (req, res) => {
  const brands = await Brand.find({});
  res.render("internal/brands/index", { brands });
});

app.get(
  "/brands/:id",
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id).populate("contact");
    res.render("internal/brands/brand", { brand });
  })
);

app.get(
  "/brands/:id/edit",
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    res.render("internal/brands/edit", { brand });
  })
);

app.put(
  "/brands/:id",
  validateBrand,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(
      id,
      { ...req.body.brand },
      { runValidators: true }
    );
    res.redirect(`/brands/${brand._id}`);
  })
);

app.post(
  "/brands",
  validateBrand,
  catchAsync(async (req, res, next) => {
    const brand = new Brand(req.body.brand);
    await brand.save();
    res.redirect("/brands");
  })
);

app.get("/internal/new", async (req, res) => {
  res.render("internal/brands/new");
});

app.delete(
  "/brands/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    res.redirect(`/brands`);
  })
);

app.post(
  "/brands/:id/contact",
  validateContact,
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    const contact = new Contact(req.body.contact);
    brand.contact.push(contact);
    await contact.save();
    await brand.save();
    res.redirect(`/brands/${brand._id}`);
  })
);

app.delete(
  "/brands/:id/contact/:contactId",
  catchAsync(async (req, res) => {
    const {id, contactId} = req.params;
    await Brand.findByIdAndUpdate(id, { $pull: {contact: contactId}}) 
    await Contact.findByIdAndDelete(contactId);
    res.redirect(`/brands/${id}`);
  })
);

// -------------------------

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
