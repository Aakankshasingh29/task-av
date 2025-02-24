import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import route from "./userRoutes.js";

const app = express();
app.use (bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT|| 6000;
const URL = process.env.MONGOURL;

async function connectToDatabase() {
    try {
        mongoose.connect('mongodb://0.0.0.0:27017/task-av',{
            useNewUrlParser:true,
            useUnifiedTopology: true

        });
        console.log('connected to MongoDB sucessfully')
    } catch (error) {
        console.error('error in connecting MongoDB',error);
    }
}
app.listen(PORT,()=>{
    connectToDatabase();
    console.log(`server is running on PORT: ${PORT}`);
})
app.use("/api",route);




