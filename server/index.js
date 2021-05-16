const express = require("express");
const mongoose = require("mongoose");
const formData = require("express-form-data");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const auth = require("./middlewares/auth");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");
const { ApolloServer, gql } = require("apollo-server-express");

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
  userId: String,
});
const Game = mongoose.model("Game", gameSchema, "games");

const userSchema = new mongoose.Schema({
  nickname: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});
const User = mongoose.model("User", userSchema, "users");

const commentSchema = new mongoose.Schema({
  gameId: String,
  nickname: String,
  text: String,
});
const Comment = mongoose.model("Comment", commentSchema, "comments");

const ratingSchema = new mongoose.Schema({
  gameId: String,
  userId: String,
  value: Number,
});
const Rating = mongoose.model("Rating", ratingSchema, "ratings");

const app = express();
app.use(express.static("public"));
app.use(cors());

app.use(formData.parse());
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "DELETE"],
  },
});

function generateToken(user) {
  return jwt.sign({ _id: user._id }, "aghkshdjfdgfklyeru42fdg");
}

app.post("/registration", async function (req, res) {
  const { nickname, email, password, isAdmin } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    nickname,
    email,
    password: passwordHash,
    isAdmin,
  });

  user.save().catch(() => res.status(500).send());

  const token = generateToken(user);

  res
    .header("Access-Control-Expose-Headers", "x-auth-token")
    .header("x-auth-token", token)
    .json(user);
});

app.post("/login", async function (req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) res.status(400).send();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) res.status(400).send();

  const token = generateToken(user);

  res
    .header("Access-Control-Expose-Headers", "x-auth-token")
    .header("x-auth-token", token)
    .json(user);
});

app.post("/games", auth, function (req, res) {
  const { title, platform, genre, maturity, price, desc, image, userId } =
    req.body;

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
    userId,
  });

  game
    .save()
    .then(() => res.send(game))
    .catch(() => res.status(500).send());
});

app.get("/games", function (req, res) {
  if (req.query.platform || req.query.genre || req.query.maturity) {
    platform = req.query.platform;
    genre = req.query.genre;
    maturity = req.query.maturity;
    Game.find({ platform, genre, maturity })
      .lean()
      .then((games) => {
        res.send(games);
      })
      .catch(() => res.status(404).send());
  } else {
    Game.find()
      .lean()
      .then((games) => {
        res.send(games);
      })
      .catch(() => res.status(503).send());
  }
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
        userId: game.userId,
      })
    )
    .catch(() => res.status(404).send());
});

app.delete("/games/:gameId", auth, function (req, res) {
  const gameId = req.params.gameId;

  Game.findByIdAndDelete(gameId)
    .then((game) => res.send(game))
    .catch(() => res.status(404).send());
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
  socket.on("message", (msg) => {
    switch (msg.type) {
      case "comments":
        Comment.find({ gameId: msg.gameId }).then((comments) =>
          socket.send({ type: "comments", comments })
        );

        break;
      case "add-comment":
        const comment = new Comment({
          gameId: msg.gameId,
          nickname: msg.nickname,
          text: msg.text,
        });
        comment
          .save()
          .then(() => {
            Comment.find({ gameId: msg.gameId }).then((comments) =>
              socket.send({ type: "comments", comments })
            );
          })
          .catch((e) => console.log(e));

        break;

      case "delete-comment":
        Comment.findByIdAndDelete(msg.commentId)
          .then(() =>
            Comment.find({ gameId: msg.gameId })
              .then((comments) => socket.send({ type: "comments", comments }))
              .catch((e) => console.log(e))
          )
          .catch((e) => console.log(e));

        break;

      case "rating":
        Rating.find({ gameId: msg.gameId }).then((ratings) => {
          let sum = 0,
            i = 0;
          for (i; i < ratings.length; i++) {
            sum += ratings[i].value;
          }
          const result = sum / i;
          socket.send({ type: "rating", value: result });
        });
        break;

      case "add-rating":
        Rating.findOne({ gameId: msg.gameId, userId: msg.userId })
          .then((ratingFound) => {
            if (!ratingFound) {
              const rating = new Rating({
                gameId: msg.gameId,
                userId: msg.userId,
                value: msg.value,
              });
              rating
                .save()
                .then(() => {
                  Rating.find({ gameId: msg.gameId }).then((ratings) => {
                    let sum = 0,
                      i = 0;
                    for (i; i < ratings.length; i++) {
                      sum += ratings[i].value;
                    }
                    const result = sum / i;
                    socket.send({ type: "rating", value: result });
                  });
                })
                .catch((e) => console.log(e));
            } else {
              Rating.findOneAndUpdate(
                { gameId: msg.gameId, userId: msg.userId },
                { value: msg.value }
              )
                .then(() => {
                  Rating.find({ gameId: msg.gameId }).then((ratings) => {
                    let sum = 0,
                      i = 0;
                    for (i; i < ratings.length; i++) {
                      sum += ratings[i].value;
                    }
                    const result = sum / i;
                    socket.send({ type: "rating", value: result });
                  });
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));

        break;

      default:
        break;
    }
  });
});

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "hello world",
  },
};

const serverGql = new ApolloServer({ typeDefs, resolvers });

serverGql.applyMiddleware({ app });

server.listen(3000, () => console.log("Server is listening on port 3000.."));
