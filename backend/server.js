const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');



dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

const userRouter = require('./Routes/userRoutes');

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

app.get("/",userRouter)


app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})