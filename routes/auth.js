const express = require("express");
const passport = require("passport");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:8081/secret";

//ruta de logout
//sterge cookies si ne duce pe home
router.get("/logout", (req, res) => {
  req.logout();
  res.cookie("session", {}, { maxAge: -1 });
  res.redirect(CLIENT_HOME_PAGE_URL);
});

//ruta de login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
  //autentificare cu "google" 
);

//ruta de redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    //dupa autentificare cu succes ne duce pe home
    res.redirect(CLIENT_HOME_PAGE_URL);
  }
);

module.exports = router;
