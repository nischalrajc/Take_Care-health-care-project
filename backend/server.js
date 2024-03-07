// Import required modules
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import routes
import userRouter from './Routes/userRoutes.js';
import doctorRouter from './Routes/doctorRoutes.js';
import adminRouter from './Routes/adminRoutes.js'

// Load environment variables
dotenv.config();

// Database connection
const uri = process.env.DATABASE;
mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Create an instance of Express
const app = express();

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/', userRouter);
app.use('/doctor', doctorRouter);
app.use('/admin', adminRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
