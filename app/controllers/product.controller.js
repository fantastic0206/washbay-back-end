const Product = require("./../models/product.model");

//---------------------------------------- PRODUCT GET ALL START -------------------------------------------//

exports.getAll = (req, res) => {
  // product find
  Product.find({}, (err, products) => {
    let product = [];
    products.forEach((data) => {
      // product favourite set
      data.favourite = false;
      data.favourites.forEach((item) => {
        if (item == req.authorId) {
          data.favourite = true;
        }
      });
      product.push(data);
    });
    res.json({ products: product });
  });
};

//------------------------------------------ PRODUCT GET ALL END --------------------------------------------//

//---------------------------------------- PRODUCT SEARCH ALL START -----------------------------------------//

exports.searchAll = (req, res) => {
  const searchTxt = req.body.searchtext;
  
  if (searchTxt == "") {
    Product.find({}, (err, products) => {
      if (err) throw err;
      res.json({ products });
    });
  } else {
    Product.find({ title: { $regex: searchTxt } }, (err, products) => {
      let product = [];
      if (products.length != 0) {
        products.forEach((data) => {
          if (data.favourites.length != 0) {
            data.favourites.forEach((item) => {
              // product favourite set
              if (item == req.authorId) {
                data.favourite = true;
              } else data.favourite = false;
            });
          } else {
            data.favourite = false;
          }
          product.push(data);
        });
        res.json({ products: product });
      } else res.json({ products: [] });
    });
  }
};

//---------------------------------------- PRODUCT SEARCH ALL END -------------------------------------------//

//---------------------------------- PRODUCT FAVOURITE DATA UPDATE START ------------------------------------//

exports.updateFavourite = (req, res) => {
  const productId = req.body.productid;
  const authorId = req.authorId;

  Product.findById(productId, (err, products) => {
    if (err) throw err;

    // product favourites data by user
    const index = products.favourites.indexOf(authorId);
    if (index > -1) {
      products.favourites.splice(index, 1);
    } else {
      products.favourites.push(authorId);
    }

    const updateData = {
      favourites: products.favourites,
    };

    // product favourite data update
    Product.findByIdAndUpdate(productId, updateData, (err) => {
      if (err) throw err;
      else res.json({ success: "success" });
    });
  });
};

//----------------------------------- PRODUCT FAVOURITE DATA UPDATE END -------------------------------------//

//--------------------------------- PRODUCT FAVOURITE DATA GET ALL START ------------------------------------//

exports.getFavourites = (req, res) => {
  Product.find({}, (err, products) => {
    let product = [];
    products.forEach((data) => {
      data.favourites.forEach((item) => {
        if (item == req.authorId) {
          data.favourite = true;
          product.push(data);
        }
      });
    });
    console.log(product);
    res.json({ products: product });
  });
};

//---------------------------------- PRODUCT FAVOURITE DATA GET ALL END -------------------------------------//

//-------------------------------- PRODUCT FAVOURITE DATA SEARCH ALL START ----------------------------------//

exports.getSearchFavourites = (req, res) => {
  const searchTxt = req.body.searchtext;

  Product.find({ title: { $regex: searchTxt } }, (err, products) => {
    let product = [];
    products.forEach((data) => {
      data.favourites.forEach((item) => {
        // product favourite set
        if (item == req.authorId) {
          data.favourite = true;
          product.push(data);
        }
      });
    });
    console.log(product);
    res.json({ products: product });
  });
};

//--------------------------------- PRODUCT FAVOURITE DATA SEARCH ALL END -----------------------------------//
