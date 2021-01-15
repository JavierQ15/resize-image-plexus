const express = require("express");
const multer = require("multer");
// Import the path module
const path = require("path");
const fs = require("fs");
//Configuration to save images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathWhereSave = path.resolve("./images/original/");
    //Generate the necessary folders
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
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

const api = express.Router();
const taskCtrl = require("../controllers/task");

api.post("", upload.single("original"), taskCtrl.processImage);
api.get('/:taskId',taskCtrl.getStatus)
module.exports = api;
