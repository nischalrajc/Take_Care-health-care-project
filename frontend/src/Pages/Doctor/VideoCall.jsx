import React, { useContext } from 'react'
import { useEffect } from 'react'
import { SocketContext } from '../../Context/socketContext';


function VideoCall() {

    const { name, callAccepted, myVideo, userVideo, callEnded, stream, setStream, call, socket, me, setMe } = useContext(SocketContext)

    useEffect(() => {
        
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            }).catch(error => {
                console.error('Error accessing media devices:', error);
            });

        // socket.on('callUser', ({ from, name: callerName, signal }) => {
        //     setCall({ isRecievedCall: true, from, name: callerName, signal })
        // })

    }, []);

    return (
        <div>
            <div>
                <video ref={myVideo} autoPlay muted />
            </div>
        </div>

    )
}

export default VideoCall
