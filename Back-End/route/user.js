const express = require("express");
const User = require("../model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {

    req.checkBody("name","User name cannot be empty.").notEmpty();
    req.checkBody("email","Email cannot be empty.").notEmpty();
    req.checkBody("password","Password cannot be empty.").notEmpty();
    
    var error = req.validationErrors();

    if(error){
        res.status(500).send(error);
    }
    else{
        let newObj = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        });
    
        newObj.save((error) => {
            if (error){
                res.status(500).send(error);
            }
            else{
                res.json(newObj);
            }
        });
    }
});

router.post("/login", (req, res) => {

    User.findOne({ name : req.body.identity, password : req.body.password }, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({ message : "User not found." })
        }
        else{
            const payload = {
                id : result._id,
                name : result.name
            };

            const token = jwt.sign(payload, "secretkey");

            res.json({ token : token });
        }
    });
});

module.exports = (function(){
    return router;
})();