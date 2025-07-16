import express from 'express';
import dotenv from 'dotenv';
import {v2 as cloudinary} from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

router.route("/").get((req,res)=>{
    res.send("hello from post route");
})

export default router;