import React from "react";
import { createContext, useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

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

    useEffect(()=>{
        socket.on('me', (id) => setMe(id))
    },[])

    // useEffect(() => {
    //     // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //     //     .then((currentStream) => {
    //     //         setStream(currentStream);

    //     //         // myVideo.current.srcObject = currentStream;
    //     //     })

    //     // socket.on('me', (id) => setMe(id))

    //     // socket.on('callUser', ({ from, name: callerName, signal }) => {
    //     //     setCall({ isRecievedCall: true, from, name: callerName, signal })
    //     // })
    // }, []);

    const newUser = (id) =>{
        socket.emit("newuser",id)
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

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {

            socket.emit('callUser', { userToCall: id, signalData: data, from:me, name });
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;

    }

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
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
            me,
            newUser,
            setCall,
            setMe,
            callUser,
            leaveCall,
            answerCall,
            socket
        }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };

