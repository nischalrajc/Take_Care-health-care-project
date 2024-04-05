import { Server } from 'socket.io';

export const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: ['http://localhost:3000', '*'],
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    const users = {}

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
        socket.emit("me", socket.id);

        socket.on("newuser", (userId) => {
            users[userId] = socket.id;
            // console.log(users)
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            socket.broadcast.emit("callended")
        });

        socket.on("callUser", ({ userToCall, signalData, from, appointmentId, name }) => {
            // console.log("user to call", userToCall)
            // console.log("doctor socket id", from)
            const userToCallId = users[userToCall]
            console.log("user to call socket id", userToCallId)
            io.to(userToCallId).emit("callUser", { signal: signalData, from, appointmentId, name });
        });

        socket.on("answerCall", (data) => {
            // console.log("answerCall",data)
            io.to(data.to).emit("callAccepted", data.signal)
        });

    })

}

