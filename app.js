import express from "express";

const app = express();

app.use(express.static("./public"));

const PORT = process.env.port || 3080;

app.get("/secret", homePage);

function homePage(req, res) {
  res.send("🖐 Hi mom");
  //   res.send()
}

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
