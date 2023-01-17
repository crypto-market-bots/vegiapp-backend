const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required: [true,"Please Enter your Name"],

    },
    phone:{
        type:Number,
        required: [true,"Please Enter your Phone Number"],
        minLength: [10,"Phone Number should be 10 Numbers"],
        maxLength:[10,"Phone Number should be 10 Numbers"],
    },
    email: {
        type: String, 
        required: [true,"Please Enter your email"], 
        trim: true,
        unique:true,
        validate: [validator.isEmail,"Please Enter the valid email"],
   
    },
    password: {
        type: String, 
        required: [true,"Please Enter the password"], 
        trim: true,
        minLength: [6,"password should be greater than or equal to 6 Characters"],
        select: false
    },
    role: {
        type:String,
        default: "user",
    },
    current_store_location :{
        type: mongoose.Schema.ObjectId,
        ref: "Location",
       
    },
    
    delivery_address : [{
        type: mongoose.Schema.ObjectId,
        ref: "Location",
    }]

});

userSchema.path('phone').validate(function validatePhone() {
    return ( this.phone > 999999999 && this.phone <= 9999999999);
  });
module.exports= mongoose.model("User",userSchema);