const express = require("express");
const router = express.Router();
const Image = require("../models/imageModel");
const Author = require("../models/authorModel");
const multer = require('multer')
const path = require('path')
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get("/", async (req, res)=>{ //get all images
    const allImages = 
    await Image
    .find()
    .then(r => console.log("Successfully completed"))
    .catch(err => console.log(err, "Error occurred"))
    res.json(allImages)
})

router.get("/:id", async (req, res)=>{ //get certain image according to user id
    const authorID = req.params.id;
    const image = await Image
    .find({author: authorID})
    .then(r => console.log("Successfully completed"))
    .catch(err => console.log(err, "Error occurred"))
    res.json(image)
})

// the field name is file
router.post("/:id", upload.single('file'), async (req, res) => {    //image post
    let title = req.body.title;
    let date = req.body.date;
    let authorID = req.params.id;

    let newImage = new Image({
        title: title, 
        date: date, 
        author: authorID,
        file: {
            data:fs.readFileSync("uploads/" + req.file.filename),
            contentType: "Image/png/jpg"
        }
    });

    newImage.save().then(
        _ => console.log('Image saved successfully')
    ).catch(
        err => console.log(err, "Error occurred")
    )
    res.send({added: true});
})

module.exports = router;