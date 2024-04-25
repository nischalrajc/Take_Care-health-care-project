import { Server } from 'socket.io';

export const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin:['http://localhost:3000','http://localhost:5000'],
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
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            socket.broadcast.emit("callended")
        });

        socket.on("callUser", ({ userToCall, signalData, from, appointmentId, name }) => {
            const userToCallId = users[userToCall]
            io.to(userToCallId).emit("callUser", { signal: signalData, from, appointmentId, name });
        });

        socket.on("answerCall", (data) => {
            const id = users[data.to]
            io.to(id).emit("callAccepted", data.signal)
        });

        socket.on("callEnded",(data)=>{
            const doctorId = users[data.doctorId]
            if (data.doctorId) {
                io.to(doctorId).emit("callEnded");
              } else {
                console.log("User not found");
              }
        })

    })

}

