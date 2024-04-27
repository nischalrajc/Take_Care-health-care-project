import React from "react";
import { createContext, useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000/');

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('Doctor')


    const myVideo = useRef(null);
    const userVideo = useRef(null)
    const connectionRef = useRef();

    useEffect(() => {
        socket.on('me', (id) => setMe(id))
    }, [])

    const newUser = (id) => {
        socket.emit("newuser", id)
    }

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id, appointmentId, doctorId) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: doctorId, appointmentId, name });
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            console.log("call accepted by the user")
            peer.signal(signal);
        });

        connectionRef.current = peer;

    }

    const leaveCall = () => {
        setCallEnded(true);

        if (myVideo.current) {
            myVideo.current.srcObject = null;
        }

        if (userVideo.current) {
            userVideo.current.srcObject = null;
        }

        if (connectionRef.current) {
            // connectionRef.current.destroy();
            connectionRef.current = null;
        }

        window.location.href = '/';

        socket.emit("callEnded", { doctorId: call.from });

    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            setStream,
            name,
            setName,
            callEnded,
            setCallEnded,
            me,
            newUser,
            setCall,
            setMe,
            callUser,
            leaveCall,
            answerCall,
            socket,
            connectionRef
        }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };

