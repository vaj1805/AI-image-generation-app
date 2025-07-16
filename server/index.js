import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import mongoose from 'mongoose';
import postRoutes from "./routes/postRoutes.js";
import imageApiRoutes from "./routes/imageApiroutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/post' , postRoutes);
app.use('/api/v1/imageapi' , imageApiRoutes);

app.get('/' , async (req , res) => {
    res.send('lo');
})

const startServer = async () => {

    try {
        connectDB(process.env.MONGO_URL);
        console.log("mongo connected");
    } catch (error) {
        console.log(error);
    }

    app.listen(process.env.PORT , () => {
        console.log(`server has started on port ${process.env.PORT}`);
    })
}

startServer();
