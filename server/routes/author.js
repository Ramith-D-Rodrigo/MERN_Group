const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");
const bcrypt = require("bcrypt");

const saltRounds = 10;


router.get("/:id",(req, res)=>{ //get certain author
    Author.find({_id:req.params.id}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

router.get("/",(req, res)=>{    //get all authors
    Author.find({}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

router.post("/", async (req, res)=> {    //Author Register
    let email = req.body.email;
    let name = req.body.name;
    let plainpassword = req.body.password;

    const result = await Author.findOne({email});

    if(result){
        res.json({status:400, msg:"Account already exists"});
    }
    else{
        const password = await bcrypt.hash(plainpassword, saltRounds);

        let newAuthor = {email, name, password};
    
        await Author.create(newAuthor, (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                res.json({status:200, msg:"Register success"});
            }
        });
    }
})

module.exports = router;