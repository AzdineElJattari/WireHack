var express = require("express");
var router = express.Router();
var app = express();
var pointers = require("./../../backend-data/pointers");
var humanpointers = require("./../../backend-data/humanpointers")
var cors= require('cors');

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

//GET homepage
router.get("/", function(req, res, next) {
  res.render("index", { title: "Introduction page" });
});

//GET pointers
  router.get("/api/v1/pointers", cors(corsOptionsDelegate), (req, res) => {
  res.json(pointers);
});

router.get("/api/v1/humanpointers", cors(corsOptionsDelegate), (req, res) => {
  res.json(humanpointers);
});

module.exports = router;
