const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");

const foodData = require("./data/footdata.json");
const finlandCity = require("./data/cities.json");
const options = require("./data/options.json");
const trainModel = require("./data/trainModel.json");
const app = express();
//app.use(bodyParser());
app.use(cors());
const port = 5000;

app.use("/api/attachment/foods", express.static("./public/images"));

// GET

app.get("/", (req, res) => {
  res.send("<em>Reindeer food service for train passengers</em>");
});

//menus
app.get(`/api/menus`, (req, res) => {
  try {
    res.send(foodData);
  } catch (error) {
    console.log(error.message);
  }
});

//cities
app.get(`/api/cities`, (req, res) => {
  try {
    res.send(finlandCity);
  } catch (error) {
    console.log(error.message);
  }
});
//options for food filter
app.get(`/api/options`, (req, res) => {
  try {
    res.send(options);
  } catch (error) {
    console.log(error.message);
  }
});

//trains from night shift
app.get(`/api/trains`, (req, res) => {
  try {
    res.send(trainModel);
  } catch (error) {
    console.log(error.message);
  }
});

// POST
app.post("/departure", (req, res) => {
  const departureInfo = req.body;
  res.send(departureInfo);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
