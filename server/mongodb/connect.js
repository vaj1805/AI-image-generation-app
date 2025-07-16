import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);  
    } catch(error) {
        console.log("Error in connection" , error);
    }
}


export default connectDB;