require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const config = require("./app/config/db.config");
const path = require("path");

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/")));

const MONGODB_URI = config.mongodburi || "mongodb://localhost:27017/ecommerce";

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to washbaybackend application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
