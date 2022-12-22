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
  //salveaza cookies urile 
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],//"criptat" dupa cheia asta
    maxAge: 24 * 60 * 60 * 1000,//asta este timpul cat este valabil cookie ul
    //dupa expirare timp se cere reautentificare
    //este in milisecunde 
  })
);

//astea 2 trebuie mereu ca sa mearga passport
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

//ruta secret
//e putin diferita
//are si middleware ul isAuthenticated in care se intra inainte de finalizare
//request
//VEZI FOLDER MIDDLEWARE acolo e definit
app.get("/secret", isAuthenticated, (req, res) => {
  res.status(200).send({ message: "Esti autorizat!" });
});

app.use("/*", (req, res) => {
  res.status(200).send("Rulez boss");
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});
