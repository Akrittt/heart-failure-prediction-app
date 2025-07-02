import mongoose, { model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const profileSchema = new mongoose.Schema({
    First_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
    },
    Last_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
    },
    Hospital_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
    },
    Email: {
    type: Email,
    required: true,
    lowercase: true
    },
    Password: {
        type: String,
        required: [true,"password is required"]
    },
    refreshToken:{
        type: String
    }
},
{
    timestamps:true
})

profileSchema.pre("save", async function (next){
    if(this.isModified("Password")){
        this.Password = bcrypt.hash(this.Password, 10)
        next()
    }
})

export const user = mongoose.model("user" , profileSchema)