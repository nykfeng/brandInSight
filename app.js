const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const Brand = require("./models/brand");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.port || 3080;

app.get("/home", homePage);
app.get("/internal", internal);
app.get("/free-user", freeUser);

app.get("/createBrand", createBrand);

function homePage(req, res) {
  res.render("home");
}

function internal(req, res) {
  res.send("internal employee page");
}

function freeUser(req, res) {
  console.log("🖐 Hi mom");
  res.render("home");
}

async function createBrand(req, res) {
  const brand = new Brand({
    name: "Nvidia Corp",
    website: "www.nvidia.com",
    description:
      "NVIDIA is a computing platform company, innovating at the intersection of graphics, HPC, and AI.",
    employee: {
      min: 10000,
      max: 15000,
    },
    headquarters: "Santa Clara",
  });
  await brand.save();
  res.send(brand);
}

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
