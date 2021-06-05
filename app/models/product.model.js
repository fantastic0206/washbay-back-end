const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    text: true
  },
  items: {
    type: Number,
    required: true,
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  favourite: {
    type: Boolean,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
