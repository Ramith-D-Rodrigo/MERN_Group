const express = require("express");
const router = express.Router();
const Image = require("../models/imageModel");

router.get("/",(req, res)=>{ //get all images
    Image.find({}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})


router.get("/:id",(req, res)=>{ //get certain image according to image id
    Image.find({_id:req.params.id}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

router.post("/:id",(req, res)=>{    //image post
    let title = req.body.title;
    let date = req.body.date;
    let author = req.params.id;   
    let newImage = {title, date, author};

    Image.create(newImage, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

module.exports = router;