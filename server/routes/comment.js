const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const comment = require("../models/commentModel");
const Article = require("../models/articleModel");
const Author = require("../models/authorModel");
const { findById } = require("../models/commentModel");

//check is the authentication function that return the user when give the user token
router.get("/:id",check,asyncHandler( async (req, res)=>{    //get all comments for an article
    
    const article = await Article.findById(req.params.id);
    //check validity of the given article id
    if(!article){
        res.status(400);
        throw new Error ("Enter a valid Article");
    }
            
    let comments = await comment.find({"article" : req.params.id});
    if(!comments){
        res.status(400);
        throw new Error("Can't retrieve comments");
    }
    
    res.status(200).json(comments);
      
}));



router.post('/:id' , check , asyncHandler( async (req,res)=>{
    if(!req.body.comment){
        res.status(400);
        throw new Error('Please add a coment field');
    }
    const article = await Article.findById(req.params.id);
    if(!article){
        res.status(400);
        throw new Error('Article not Found');
    }

    const cmnt = await comment.create({
        comment : req.body.comment,
        date: new Date(),
        commenter: req.user.id,
        article:req.body.article,
    });

    res.status(200).json(cmnt);
    
}));


router.put('/:id' , check , asyncHandler( async (req , res) =>{
    const user = req.user.id;

    const article = await Article.findById(req.body.article);
    if(!article){
        res.status(400);
        throw new Error("Add valid Article");
    }

    const commnt = await comment.findById(req.params.id);
    if(!commnt){
        res.status(400);
        throw new Error("Please add a valid comment id");
    }
    //check who wants to edit the comment is the commenter
    if(comment.commenter !== user){
        res.status(400);
        throw new Error("Not Authorized");
    }

    //options {} for cretae new if not found
    const updatedComment = await comment.findByIdAndUpdate(req.params.id , req.body , {
        new:true,
    });

    res.status(200).json(updatedComment);
}));


router.delete('/:id' , check , asyncHandler( async (req , res )=>{
    const commnt = await findById(req.params.id);

    if(!commnt){
        res.status(400);
        throw new Error("Comment not Found");
    }

    await comment.remove();

    res.status(200).json({id:`${req.params.is} is deleted`});
}))