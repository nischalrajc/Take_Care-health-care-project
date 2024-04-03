import { Server } from 'socket.io';

export const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: ['http://localhost:3000', '*'],
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    
io.on('connection', (socket) => {
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

}

