const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models").User;
const axios = require("axios");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id } });
  done(null, user);
});

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8081/api/auth/google/redirect",
    },
    (accessToken, refreshToken, email, done) => {
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
