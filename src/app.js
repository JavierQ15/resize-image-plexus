// Load required libraries
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

// Run express

const app = express();

// Load routes
const taskRoutes = require("./routes/task");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Add prefixes to routes / load routes
app.use("/task", taskRoutes);

// Export module
module.exports = app;
