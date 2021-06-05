// PRODUCT ROUTER

module.exports = (app) => {
  const products = require("../controllers/product.controller.js"); // REQUIRE PRODUCT CONTROLLER
  const isAuthenticated = require("../middlewares/authproduct.js"); // REQUIRE AUTH MIDDLEWARE

  var router = require("express").Router();

  router.get("/", isAuthenticated, products.getAll); // GET ALL PRODUCT DATA
  router.post("/searchall", isAuthenticated, products.searchAll); // GET ALL PRODUCT SEARCH DATA
  router.post("/favourites/edit", isAuthenticated, products.updateFavourite); // EDIT FAVOURITE PRODUCT DATA
  router.get("/favourites", isAuthenticated, products.getFavourites); // GET ALL FAVOURITE PRODUCT DATA 
  router.post(
    "/favourites/search",
    isAuthenticated,
    products.getSearchFavourites
  ); // SEARCH ALL FAVOURITE PRODUCT DATA

  app.use("/api/products", router);
};
