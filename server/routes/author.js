const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

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

router.post("/auth",async (req, res)=>{    //author authentication
    const a = await Author.findOne({ email : req.body.email });
    if(a){
        const validPassword = await bcrypt.compare(req.body.password, a.password);
        if(validPassword){
            const author = {
                id: a._id,
                email: a.email,
                name: a.name
            };
            res.json({status : 200, token : jwt.sign(author, process.env.TOKEN_SECRET)});
        }
        else{
            res.json({status: 400, msg: "Invalid login credentials", data: null});
        }
    }
    else{
        res.json({status: 400, msg: "User was not found", data: null});
    }
})

router.post("/register", async (req, res)=> {    //Author Register
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
                res.json({status:200, msg:"Registration is Successful!"});
            }
        });
    }
})

module.exports = router;