const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const conf = require("../config");
const adminCode = conf["dev"].app.adminCode;
/**
 * GET the register html page.
 */

router.get("/register", function (req, res) {
  res.render("register");
});
/**
 * Handle the sign up logic.
 * Has the magic number for admins.
 */
router.post("/register", function (req, res) {
  const newUser = new User({ username: req.body.username });
  if (req.body.adminCode === adminCode) {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Εγινε συνδεση του/της " + user.username);
      res.redirect("/patients");
    });
  });
});

/**
 * Login langing page route.
 */
router.get("/", function (req, res) {
  res.render("login");
});

/**
 * Handle the success or the failure of the authentination.
 */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/patients",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

/**
 * Route that logs you off.
 */
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Εγινε Αποσυνδεση");
    res.redirect("/");
  });
});

module.exports = router;
