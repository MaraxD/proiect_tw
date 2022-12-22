const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models").User;
const axios = require("axios");


//ce face functia asta, baga utilizatorul intr un cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//foloseste cookie ul ca sa ia datele utilizatorului poate sa ia orice in functie de ce vrem
passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id } });
  done(null, user);
});


//asta aici salveaza poza initial o ia binar dupa in baza64 dupa e scris ca fisier normal. Poate ar fi folositor idk
//salveaza imaginea de la utilizatorul google
const save = async (img, data) => {
  try {
    let b64;
    const response = await axios.get(img, { responseType: "arraybuffer" });
    b64 = await Buffer.from(response.data, "binary").toString("base64");
    let base64Data = b64.replace(/^data:image\/[a-z]+;base64,/, "");
    require("fs").writeFile(
      "./public/images/users/" + data + ".jpeg",
      base64Data,
      "base64",
      function (err) {
        console.log(err);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//folosire googleStrategy
//ia credentialele din env pe care le avem in baza de date google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8081/api/auth/google/redirect",
      //linkul asta la fel cu link ul din portalul google si dupa autentificare de duce in alta pagina
    },
    //functia callback care functioneaza cu google strategy
    //cauta user cu email ul asta in baza de date
    (accessToken, refreshToken, email, done) => {
      //AICI SE MODIFICA IN MARE PARTE dupa autentificare ce vrem sa facem in rest ramane cam la fel doar daca vrem sa salvam altceva in cookie
      ///////////////
      User.findOne({
        where: {
          email: email.emails[0].value,
        },
      }).then((currentUser) => {
        if (currentUser == null) {
          const img = email.photos[0].value.slice(0, -4) + "400-c";

          User.create({
            firstName: email.name.givenName,
            lastName: email.name.familyName,
            email: email.emails[0].value,
          })
            .then((user) => {
              save(img, user.id);
              done(null, user);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          done(null, currentUser);
        }
      });
    }
  )
);
