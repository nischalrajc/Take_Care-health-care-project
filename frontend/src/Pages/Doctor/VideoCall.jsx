import React, { useContext } from 'react'
import { useEffect } from 'react'
import { SocketContext } from '../../Context/socketContext';
import { useParams } from 'react-router-dom';


function VideoCall() {
    const { userId } = useParams()

    const { callAccepted, myVideo, userVideo, callEnded, setStream, callUser } = useContext(SocketContext)


    console.log("doctor video", myVideo)
    console.log("user video", userVideo)

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            }).catch(error => {
                console.error('Error accessing media devices:', error);
            });

    }, []);

    useEffect(() => {
        if (callAccepted && !callEnded) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(currentStream => {
                    userVideo.current.srcObject = currentStream;
                })
                .catch(error => {
                    console.error('Error accessing media devices:', error);
                });
        }
    }, [callAccepted, callEnded, userVideo]);

    useEffect(() => {
        callUser(userId)
    }, [])

    return (
        <div>
            <div>
                <div>doctor</div>
                <video ref={myVideo} autoPlay muted />
            </div>

            {
                callAccepted && !callEnded && (
                    <div>
                        <div>Patient</div>
                        <video ref={userVideo} autoPlay />
                    </div>
                )
            }

        </div>
    )
}

export default VideoCall
