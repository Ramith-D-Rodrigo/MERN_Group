const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");


router.get("/:id",(req, res)=>{
    Author.find({_id:req.params.id}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

router.post("/:id",(req, res)=>{    //Author Register
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    
    let newAuthor = {email, name, password};

    Author.create(newAuthor, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

module.exports = router;