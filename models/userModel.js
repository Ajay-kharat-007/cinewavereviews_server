const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter your name"]
    },
    email : {
        type : String,
        required : [true, "Please enter you email address"]
    },
    phone : {
        type : String,
        required : [true, "Please enter you phone number"]
    },
    password : {
        type : String,
        required : [true, "Please enter valid password"]
    },
    gender : {
        type : String,
        enum : ["Male", "Female"],
        required : [true, "Please enter you email address"]
    }
})

module.exports = mongoose.model("Users", userSchema);