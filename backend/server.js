import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'


import userRouter from './Routes/userRoutes.js'


dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

// -----database connection-----

const uri = process.env.DATABASE;

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });


// ---cors------
const corsoptions  = {
    origin : 'http://localhost:3000' ,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue : false,
    optionsSuccessStatus : 204,
    credentials : true,  
}


app.use(cors(corsoptions))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());

app.use("/",userRouter)


app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})