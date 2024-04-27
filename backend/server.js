import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import nocache from 'nocache';
import { initializeSocket } from './socket.js';
import userRouter from './Routes/userRoutes.js';
import doctorRouter from './Routes/doctorRoutes.js';
import adminRouter from './Routes/adminRoutes.js'

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

const app = express();
const server = createServer(app);

const corsOptions = {
    origin:'https://takecareofficial.online',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(nocache());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(morgan('dev'));

// Routes
app.use('/', userRouter);
app.use('/doctor', doctorRouter);
app.use('/admin', adminRouter);

// Socket initialization
initializeSocket(server);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Server startup
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
