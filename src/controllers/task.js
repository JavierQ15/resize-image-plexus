//Image processing library
const sharp = require("sharp");
//Libraries to work with files
const fs = require("fs");
const path = require("path");
//Library to generate md5
const md5 = require("crypto-js/md5");

module.exports = {
  processImage: (req, res) => {
    const file = req.file;
    if (!file)
      return res
        .status(400)
        .send({ status: "error", message: "We have not received any images" });
    //File name without extension
    const filename = file.originalname.split(".").slice(0, -1).join(".");
    const imageBuffer = fs.readFileSync(file.path);
    //Generate random taskId
    const taskId = Math.random().toString(36).substr(2, 9)+Math.random().toString(36).substr(2, 9);
    sharp(imageBuffer)
      .resize({ width: 1024 })
      .toFile(
        path.resolve(
          `./images/output/${filename}/1024/${md5(
            filename+"_1024"
          )}.${file.originalname.replace(/^.*[.]/, "")}`
        )
      );
      sharp(imageBuffer)
      .resize({ width: 800 })
      .toFile(
        path.resolve(
          `./images/output/${filename}/800/${md5(
            filename+"_800"
          )}.${file.originalname.replace(/^.*[.]/, "")}`
        ),
      );
    res.send({status:"success",taskId});
  },
};
