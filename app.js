const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
const packageRoute = require('./routes/package.route')
app.use('/api/v1/package', packageRoute)

module.exports = app;
