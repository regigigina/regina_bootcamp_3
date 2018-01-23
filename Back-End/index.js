const express = require("express");
const userRoutes = require("./route/user");
const bodyParser = require("body-parser");

const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const validator = require("express-validator");


const app = express();

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();    
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(validator());
app.use(express.static('public'));
app.use(passport.initialize());

passport.use("auth", new BearerStrategy ((token, done) => {

    console.log(token);

    jwt.verify(token, "secretkey", (error, decoded) => {
        if(error){
            return done("User not authorized.", null);
        }
        else{
            return done(null, decoded);
        }
    });
}));

app.post("/api/validatetoken", passport.authenticate("auth", { session : false }), (req, res) => {
    res.send(req.user);
});

app.use("/api/user", userRoutes);

app.listen(3000);