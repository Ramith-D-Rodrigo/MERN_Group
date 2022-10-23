const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");

router.get("/",(req, res)=>{    //get all articles
    Article.find({_ID :req.params.arid}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

router.get("/:id",(req, res)=>{ //get certain article
    Article.find({_ID :req.params.id}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

router.post("/:auid",(req, res)=>{
    let title = req.body.title;
    let content = req.body.content;
    let author = req.params.auid;
    
    let newArticle = {title, content, author};

    Article.create(newArticle, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

module.exports = router;