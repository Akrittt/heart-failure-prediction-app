import express from "express"
import connectDB from "../backend/db/db.js";
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import predictionRouter  from "../backend/controllers/predictionController.js"
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/predict" , predictionRouter);

app.get("/",(req,res)=>{
    res.send('Hello, World!');
})

//databse connection
connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`SERVER IS RUNNING at ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("moongose db connection failed!!!", error);
})

export {app} ;
