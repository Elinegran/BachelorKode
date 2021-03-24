const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const apiRoutes = require("./app/routes/routes.js");

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', apiRoutes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MB Digital." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
