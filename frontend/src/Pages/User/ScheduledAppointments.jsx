import React, { useContext, useEffect, useState } from 'react'
import ProfileHeader from '../../Components/User/ProfileHeader'
import ProfileBar from '../../Components/User/ProfileBar'
import { Axios } from '../../Axios/users'
import { useSelector } from 'react-redux'
import { SocketContext } from '../../Context/socketContext';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function ScheduledAppointments() {
    const [appointments, setAppointments] = useState([])

    const { newUser, socket, setCall, call, answerCall } = useContext(SocketContext)

    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.user)
    const id = userInfo?._id

    useEffect(() => {
        Axios.get(`/scheduled_appointments/${id}`).then((response) => {
            if (response.data) {
                setAppointments(response.data.appointments)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [id])

    useEffect(() => {
        newUser(id)

        socket.on('callUser', ({ from, appointmentId, name: callerName, signal }) => {
            setCall({ isRecievedCall: true, from, name: callerName, appointmentId, signal })
        })

    }, [])

    const joinMeeting = async () => {
        answerCall()
        const appointmentId = call.appointmentId
        navigate(`/room/${id}/${appointmentId}`)
    }

    const cancelScheduledMeeting = async (appointmentId) => {

        Swal.fire({
            // title: "Are you sure?",
            text: "Are you sure?",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2D6A76",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.get(`/cancelAppointment/${appointmentId}`).then((response) => {
                    if (response.data) {
                        Swal.fire({
                            timer: 1500,
                            text: "Meeting cancelled",
                            // icon: "success"
                        });
                    }
                }).catch((error) => {
                    console.log("error ", error)
                })
            }
        });
    }

    return (
        <div>
            <ProfileBar />
            <ProfileHeader title='scheduled_appointment' />

            {
                appointments.length === 0 ? (
                    <div className="text-gray-500 text-center mt-8">
                        You don't have any meetings scheduled.
                    </div>
                ) : (
                    appointments.map((appointment, index) => (
                        <div key={index} className="bg-[#2D6A76] text-gray-300 flex justify-center mt-8 w-1/2 mx-auto py-5 rounded-lg font-inder">
                            <div className="mx-5">
                                <div className="">
                                    {new Date(appointment.appointmentDate).toLocaleString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </div>
                                <div className="">
                                    {new Date(appointment.appointmentDate).toLocaleString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                    })}
                                </div>
                            </div>
                            <div className="mx-5">
                                <div className="">Dr. {appointment.doctor.name}</div>
                                <div className="">{appointment.doctor.specialisation}</div>
                            </div>

                            {call.isRecievedCall && call.appointmentId === appointment._id ? (
                                <div className="join-meeting-wrapper mx-5 flex items-center">
                                    <button className='join-meeting-button  px-8 rounded-md py-1 border bg-green-500 text-white border-white' onClick={joinMeeting}>Join Now</button>
                                </div>
                            ) : (
                                <div className="join-meeting-wrapper mx-5 flex items-center">
                                    <button className='hover:cursor-not-allowed opacity-50  px-8 rounded-md py-1 border text-white border-white' >join</button>
                                    <button onClick={() => cancelScheduledMeeting(appointment._id)} className='hover:cursor-pointer opacity-50  px-8 rounded-md py-1 border text-white border-white ms-3' >Cancel Meeting</button>
                                </div>
                            )}
                        </div>
                    ))
                )
            }


        </div>
    )
}

export default ScheduledAppointments
