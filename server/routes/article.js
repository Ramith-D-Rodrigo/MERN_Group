const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");
const Author = require("../models/authorModel");

router.get("/",(req, res)=>{    //get all articles
    Article.find({}, (err, result) => {
        if(err){
            console.log(err);
            res.json({status: 400});
        }
        else{
            res.json({status: 200, articles : result});
        }
    });
})

router.get("/:id",(req, res)=>{ //get certain article
    Article.find({_id :req.params.id}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.json({article: result});
        }
    });
})

router.get("/authors/:id",(req, res)=>{ //get articles of a certain author
    Article.find({author :req.params.id}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

router.post("/:auid",async (req, res)=>{  //post article of a certain author
    let title = req.body.title;
    let content = req.body.content;
    let authorID = req.params.auid;
    let updated = false;

    const author = await Author.findOne({_id: authorID}, {name : 1});
    
    let newArticle = {title, content, author, updated};

    Article.create(newArticle, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

router.put("/:id", (req,res)=>{ //update article
    let updatedContent = req.body.updatedcontent;

    Article.findByIdAndUpdate(req.params.id, {content : updatedContent, updated: true}, (err, result) =>{
        if(err){
            console.log("Error updating the article");
        }
        else{
            res.send(result);
        }
    })
})

router.delete("/:id", (req,res)=>{  //delete article
    Article.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            console.log("Error deleting the article");
        }
        else{
            res.send("Article deleted successfully");
        }
    })
})

module.exports = router;