const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const comment = require("../models/commentModel");
const Article = require("../models/articleModel");

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



router.post('/:id' , check , asyncHandler( async (req,res)=>{       //create comment for given article
    if(!req.body.comment){
        res.status(400);
        throw new Error('Please add a comment field');
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
        article:req.params.id,
    });

    if(!cmnt){      //correct the above create function parameters. when creating front end
        res.status(400);
        let msg;
        if(process.env.NODE_ENV == 'production'){
            msg = 'Something went wrong. See the create function parameters'
        }
        else{
            msg = "Something wnet wrong. Can't create.contact develper team."   //LOL
        }
        throw new Error(msg);
    }

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

    //check given comment is belongs to given article
    if(commnt.Article !== req.body.article){
        res.status(400);
        throw new Error('not Authorized');
    }

    //check who wants to edit the comment is the commenter
    if(comment.commenter !== user){
        res.status(400);
        throw new Error("Not Authorized");
    }

    //options {} for cretae new if not found
    const updatedComment = await comment.findByIdAndUpdate(req.params.id , req.body , {     //put req.body correctly
        new:true,
    });

    res.status(200).json(updatedComment);
}));


router.delete('/:id' , check , asyncHandler( async (req , res )=>{
    const user = req.user.id;

    const article = await Article.findById(req.body.article);
    if(!article){
        res.status(400);
        throw new Error("Add valid Article");
    }

    const commnt = await findById(req.params.id);
    if(!commnt){
        res.status(400);
        throw new Error("Comment not Found");
    }

    //check given comment is belongs to given article
    if(commnt.Article !== req.body.article){
        res.status(400);
        throw new Error('not Authorized');
    }

    //check who wants to delete the comment is the commenter
    if(comment.commenter !== user){
        res.status(400);
        throw new Error("Not Authorized");
    }

    await comment.remove();

    res.status(200).json({id:`${req.params.is} is deleted`});
}));

module.exports = router;
