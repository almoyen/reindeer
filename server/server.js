const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");

const foodData = require("./data/footdata.json");
const app = express();
//app.use(bodyParser());
app.use(cors());
const port = 5000;

/* const getWelcomeMessage = (req, res) => {
  res.send("<em>Reindeer food service for train passengers</em>");
}; */

/* const getAllMenus = (req, res) => {
  try {
    res.send(foodData);
  } catch (error) {
    console.log(error);
  }
};
 */
/* const postDepartureInfo = (req, res) => {
  const departureInfo = req.body;
  res.send(departureInfo);
};
 */
// GET
app.get("/", (req, res) => {
  res.send("<em>Reindeer food service for train passengers</em>");
});

app.get(`/api/menus`, (req, res) => {
  try {
    res.send(foodData);
  } catch (error) {
    console.log(error);
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
