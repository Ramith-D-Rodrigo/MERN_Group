const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const {check} = require("../middleware/authmiddleware");

const saltRounds = 10;


//Instead of above end point route --> uncomment
//@access : private
router.get("/",check ,asyncHandler( async (req, res)=>{ //get certain author
    const author = await Author.findById(req.user.id);

    if(!author){
        res.status(400);
        throw new Error("can't find a user");
    }

    res.status(200).json({
        id:author.id,
        name:author.name,
        email:author.email,
        token:generateToken(author._id),
    })

}));


//returns a token for registered user which can use in frontend to authenticate Authers
router.post("/register", asyncHandler( async (req, res)=> {    //Author Register
    let email = req.body.email;
    let name = req.body.name;
    let plainpassword = req.body.password;

    if(!email || !name || !plainpassword){
        res.status(400);
        throw new Error("Please add all fields");
    }

    const result = await Author.findOne({email});
    //check if auther already exists
    if(result){
        res.status(400);
        throw new Error("Account already exists");
    }
    else{       //hash the password
        const password = await bcrypt.hash(plainpassword, saltRounds);

        let newAuthorObject = {email, name, password};
    
        const newAuthor = await Author.create(newAuthorObject);
        
        if(newAuthor){
            res.status(201).json({
                _id:newAuthor.id,
                name:newAuthor.name,
                email:newAuthor.email,
                token:generateToken(newAuthor._id),
            });
        }else{
            res.status(400);
            throw new Error('Invalid Auther data');
        }
    }
}));

//returns a token for registered user which can use in frontend to authenticate Authers
router.post('/login' , asyncHandler( async (req , res) =>{
    const {email, password} = req.body;

    const newAuthor = await Author.findOne({email});

    if(newAuthor && process.env.NODE_ENV == "production"){
        console.log("found a author");
    }

    if(newAuthor && (await bcrypt.compare(password , newAuthor.password))){
        res.status(200).json({
            _id:newAuthor.id,
            name:newAuthor.name,
            email:newAuthor.email,
            token:generateToken(newAuthor._id),
        })
    }else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
}));

//generate jwt --> used in above routes /register and login to generate token for registered or logged user.(expires in 30 days after generate)
const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn: '30d',
    });
}

module.exports = router;