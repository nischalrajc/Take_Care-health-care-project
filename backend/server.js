// Import required modules
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import { Server } from 'socket.io'; // Importing Server from 'socket.io'
import path from 'path';
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

// socket io server creation
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

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

io.on('connection',(socket) => {
    console.log('New client connected:', socket.id);
    socket.emit("me", socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        socket.broadcast.emit("callended")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

    socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

})

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
