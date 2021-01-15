const express = require("express");
const multer = require("multer");
// Import the path module
const path = require("path");
const fs = require("fs");
//Configuration to save images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathWhereSave = path.resolve("./images/original/");
    //Genera las carpetas necesarias
    fs.mkdirSync(pathWhereSave, { recursive: true });
    fs.mkdirSync(
      path.resolve(
        `./images/output/${file.originalname
          .split(".")
          .slice(0, -1)
          .join(".")}/1024`
      ),
      { recursive: true }
    );
    fs.mkdirSync(
      path.resolve(
        `./images/output/${file.originalname
          .split(".")
          .slice(0, -1)
          .join(".")}/800`
      ),
      { recursive: true }
    );
    cb(null, pathWhereSave);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

const api = express.Router();
const taskCtrl = require("../controllers/task");

api.post("", upload.single("original"), taskCtrl.processImage);

module.exports = api;
