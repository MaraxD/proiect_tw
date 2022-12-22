require("dotenv").config();
const express = require("express");
const router = require("./routes");
const cookieSession = require("cookie-session");
const passport = require("passport");

const connection = require("./models").connection;
const { isAuthenticated } = require("./middlewares");
require("./controllers/auth");

const port = 8081;

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.get("/reset", (req, res) => {
  connection
    .sync({ force: true })
    .then(() => {
      res.status(201).send({
        message: "Database reset",
      });
    })
    .catch(() => {
      res.status(500).send({
        message: " Reset DB error",
      });
    });
});

app.get("/secret", isAuthenticated, (req, res) => {
  res.status(200).send({ message: "Esti autorizat!" });
});

app.use("/*", (req, res) => {
  res.status(200).send("Rulez boss");
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});
