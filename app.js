import express from "express";

const app = express();

app.use(express.static("./public"));

const PORT = process.env.port || 3080;

app.get("/secret", homePage);

function homePage(req, res) {
  res.send("🖐 Hi mom");
  //   res.send()
}

app.get("/login", login);
app.get("/signup", signup);

function login(req, res) {
  res.send("login");
}

function signup(req, res) {
  res.send("signup here");
}

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
