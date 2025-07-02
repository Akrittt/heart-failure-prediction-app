import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async ()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB connected !!!!! DB HOST: ${connectionInstance}`)
    } catch (error) {
        console.log("MONGO connection error" ,error);
        throw error
    }
}

export default connectDB;