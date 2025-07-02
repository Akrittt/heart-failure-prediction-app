import connectDB from "./db/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {app} from "./app.js"; 


connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("SERVER IS RUNNING");
    })
})
.catch((error)=>{
    console.log("moongose db connection failed!!!", error);
})