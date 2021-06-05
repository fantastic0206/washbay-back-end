// USER ROUTER

module.exports = (app) => {
  const users = require("../controllers/user.controller.js"); // REQUIRE USER CONTROLLER
  const isAuthenticated = require("../middlewares/authproduct.js"); // REQUIRE AUTH MIDDLEWARE

  var router = require("express").Router();

  router.post("/signin", users.signin); // SIGN IN
  router.post("/signup", users.signup); // SIGN UP
  router.post("/profile/edit", isAuthenticated, users.profileUpdate); // UESR PROFILE EDIT

  app.use("/api/users", router);
};
