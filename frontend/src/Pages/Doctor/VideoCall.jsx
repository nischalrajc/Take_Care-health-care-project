import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { SocketContext } from '../../Context/socketContext';
import { useParams } from 'react-router-dom';
import { MdCallEnd } from "react-icons/md";
import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";


function VideoCall() {
    const { userId, appointmentId } = useParams()

    // const [isUSerAudioMuted, setIsUserAudioMuted] = useState(false);
    // const [isDoctorAudioMuted, setIsDoctorAudioMuted] = useState(false);
    const [isAudioMuted,setIsAudioMuted] = useState(true)
    const { callAccepted, myVideo, userVideo, callEnded, setStream, callUser ,stream} = useContext(SocketContext)

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
        callUser(userId, appointmentId)
    }, [])
    

    const toggleAudioMute = async () => {
        const myAudioTracks = myVideo.current.srcObject.getAudioTracks();
        const userAudioTracks = userVideo.current.srcObject.getAudioTracks();

        // const myVideoTracks = myVideo.current.srcObject.getVideoTracks();
        // const userVideoTracks = userVideo.current.srcObject.getVideoTracks();
    
        myAudioTracks.forEach((track) => {
            console.log(track)
            track.enabled = !isAudioMuted;
            console.log(track)
        });
    
        userAudioTracks.forEach((track) => {
            console.log(track)
            track.enabled = !isAudioMuted;
            console.log(track)
        });
    
        // myVideoTracks.forEach((track) => {
        //     track.enabled = !isAudioMuted;
        // });
    
        // userVideoTracks.forEach((track) => {
        //     track.enabled = !isAudioMuted;
        // });
    
        setIsAudioMuted(!isAudioMuted);
    };
    

    return (

        <div className='bg-black flex flex-col justify-center items-center h-screen'>
            <div className=" flex flex-row w-4/5">
                <div className='w-full '>
                    <video className='mx-auto hover:cursor-pointer' ref={myVideo} autoPlay muted />
                </div>
                <div className=''>
                    {
                        callAccepted && !callEnded && (
                            <>

                                <div>
                                    <video className='hover:cursor-pointer' ref={userVideo} autoPlay />
                                </div>

                                <div className=' mt-10'>
                                    <textarea className='py-1 px-1' placeholder="Click hear to type.." rows="4" cols="50"></textarea>
                                </div>

                            </>
                        )
                    }
                </div>
            </div>

            <div className="flex flex-row mt-10">
                <div className="mx-2">
                    {
                        isAudioMuted ? (
                            <button>
                                <AiOutlineAudio onClick={toggleAudioMute} className='text-white text-3xl hover:cursor-pointer' />
                            </button>
                        ) : (
                            <button>
                                <AiOutlineAudioMuted onClick={toggleAudioMute} className='text-white text-3xl hover:cursor-pointer' />
                            </button>
                        )
                    }

                </div>
                <div className="mx-4">
                    <button>
                        <MdCallEnd className='text-red-600 text-4xl hover:cursor-pointer' />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default VideoCall
