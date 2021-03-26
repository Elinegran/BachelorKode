const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: "userId",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10800000
  },
}));

const apiRoutes = require("./app/routes/routes.js");

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
