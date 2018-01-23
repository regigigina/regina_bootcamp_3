const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bootcamp3");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    email : String,
    password : String
});

const User = mongoose.model("user", userSchema);

module.exports = User;