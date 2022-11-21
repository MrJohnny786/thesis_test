// const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
// const Grid = require("gridfs-stream");
// const multer = require("multer");
// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();
// const upload = multer({ storage });
// const mongooseUpload = mongoose.connection;

// let gfs;
// mongooseUpload.once("open", () => {
// // init stream
// gfs = Grid(mongooseUpload.db, mongoose.mongo);
// gfs.collection("hospital");
// });
// const storage = new GridFsStorage({
// url: db,
// file: (req, file) => {
//     return new Promise((resolve, reject) => {
//     const filename = file.originalname;
//     const fileInfo = {
//         filename: filename,
//         aliases: req.params.id,
//         bucketName: "hospital",
//     };
//     resolve(fileInfo);
//     });
// },
// });

// module.exports = router
