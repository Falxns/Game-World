const express = require("express");
const mongoose = require("mongoose");
const formData = require("express-form-data");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb."))
  .catch(() => console.log("Error connecting to mongodb."));

const gameSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  platform: String,
  genre: String,
  maturity: Number,
  price: Number,
  desc: String,
});
const Game = mongoose.model("Game", gameSchema, "games");

const app = express();
app.use(express.static("public"));
app.use(cors());

app.use(formData.parse());
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.post("/games", function (req, res) {
  const { title, platform, genre, maturity, price, desc, image } = req.body;

  let imageName = "";
  if (image instanceof fs.ReadStream) {
    imageName = mongoose.Types.ObjectId().toHexString() + ".jpg";
    const imagePath = "./public/images/games/" + imageName;

    fs.writeFileSync(
      path.join(process.cwd(), imagePath),
      fs.readFileSync(image.path)
    );
  } else {
    imageName = "default-img.png";
  }

  const game = new Game({
    title,
    platform,
    genre,
    maturity,
    price,
    desc,
    imageUrl: "http://localhost:3000/images/games/" + imageName,
  });

  game
    .save()
    .then(() => res.send(game))
    .catch(() => res.status(500).send());
});

app.get("/filter", function (req, res) {
  const platform = req.query.platform;
  const genre = req.query.genre;
  const maturity = req.query.maturity;
  Game.find({ platform, genre, maturity })
    .lean()
    .then((games) => {
      res.render("index", { games });
    })
    .catch(() => res.send("404"));
});

app.get("/games", function (req, res) {
  Game.find()
    .lean()
    .then((games) => {
      res.send(games);
    })
    .catch(() => res.status(503).send());
});

app.get("/games/:gameId", function (req, res) {
  const gameId = req.params.gameId;

  Game.findById(gameId)
    .then((game) =>
      res.send({
        title: game.title,
        imageUrl: game.imageUrl,
        platform: game.platform,
        genre: game.genre,
        maturity: game.maturity,
        price: game.price,
        desc: game.desc,
      })
    )
    .catch(() => res.status(404).send());
});

app.get("/delete/:id", function (req, res) {
  const gameID = req.params.id;

  Game.findByIdAndDelete(gameID)
    .then(() => res.redirect("/"))
    .catch(() => res.send("404"));
});

app.listen(3000, () => console.log("Server is listening.."));
