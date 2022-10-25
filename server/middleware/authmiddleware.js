const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Auther = require('../models/authorModel');

const check = asyncHandler(async(req , res , next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            //get user from the token
            req.user = await Auther.findById(decoded.id).select('-password');   //without password
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error ("Not Authorized");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not Authorized");
    }

});

module.exports = {check};