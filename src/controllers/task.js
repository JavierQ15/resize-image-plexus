//Image processing library
const sharp = require("sharp");
//Libraries to work with files
const fs = require("fs");
const path = require("path");
//Library to generate md5
const md5 = require("crypto-js/md5");
//JSON to storage the information
const TasksPath = path.resolve("./src/Tasks.json");
let Tasks = JSON.parse(fs.readFileSync(TasksPath));
const ImagesPath = path.resolve("./src/Images.json");
let Images = JSON.parse(fs.readFileSync(ImagesPath));
module.exports = {
    processImage: (req, res) => {
        const file = req.file;
        if (!file)
            return res
                .status(400)
                .send({ status: "error", message: "We have not received any images" });
        if(Images[file.originalname]) return res.status(409).send({status:"error",message:"An image with the same name has already been processed"})
        //Generate random taskId
        const taskId =
            Math.random().toString(36).substr(2, 9) +
            Math.random().toString(36).substr(2, 9);
        //File name without extension
        const filename = file.originalname.split(".").slice(0, -1).join(".");
        let newTasks = {
            status: "incomplete",
            date: Date.now(),
            1024: "imcomplete",
            800: "imcomplete",
            path: `./images/original/${filename}.${file.originalname.replace(/^.*[.]/, "")}`,
        };
        let newImages = {
            date: Date.now(),
            pathOriginal: `./images/original/${filename}.${file.originalname.replace(/^.*[.]/, "")}`,
            path800: `./images/output/${filename}/800/${md5(
                filename + "_800"
            )}.${file.originalname.replace(/^.*[.]/, "")}`,
            path1024:`./images/output/${filename}/1024/${md5(
                filename + "_1024"
            )}.${file.originalname.replace(/^.*[.]/, "")}`,
            taskId
        }
        Tasks = { ...Tasks, [taskId]: newTasks };
        fs.writeFileSync(TasksPath, JSON.stringify(Tasks, null, 4));
        Images = { ...Images, [file.originalname]: newImages };
        fs.writeFileSync(ImagesPath, JSON.stringify(Images, null, 4));
        const imageBuffer = fs.readFileSync(file.path);
        sharp(imageBuffer)
            .resize({ width: 1024 })
            .toFile(
                path.resolve(
                    newImages.path1024
                )
            )
            .then(() => {
                newTasks["1024"] = "complete";
                newTasks["1024Timestamp"] = Date.now();
                Tasks = { ...Tasks, [taskId]: newTasks };
                fs.writeFileSync(TasksPath, JSON.stringify(Tasks, null, 4));
                sharp(imageBuffer)
                    .resize({ width: 800 })
                    .toFile(
                        path.resolve(
                            newImages.path800
                        )
                    )
                    .then(() => {
                        newTasks["800"] = "complete";
                        newTasks["800Timestamp"] = Date.now();
                        newTasks["status"] = "complete";
                        Tasks = { ...Tasks, [taskId]: newTasks };
                        fs.writeFileSync(TasksPath, JSON.stringify(Tasks, null, 4));
                    });
            });
        res.send({ status: "success", taskId });
    },
    getStatus: (req, res) => {
        const {taskId} = req.params
        const task = Tasks[taskId]
        if (!task)
            return res
                .status(400)
                .send({ status: "error", message: "We have not found any task with that ID" });
        return res.send({task});
    }
};
