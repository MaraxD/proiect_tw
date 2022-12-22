const express = require("express");
const passport = require("passport");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:8081/secret";

router.get("/logout", (req, res) => {
  req.logout();
  res.cookie("session", {}, { maxAge: -1 });
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    res.redirect(CLIENT_HOME_PAGE_URL);
  }
);

module.exports = router;
