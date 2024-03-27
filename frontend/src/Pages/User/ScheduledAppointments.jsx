import React, { useEffect, useState } from 'react'
import ProfileHeader from '../../Components/User/ProfileHeader'
import ProfileBar from '../../Components/User/ProfileBar'
import { Axios } from '../../Axios/users'
import { useSelector } from 'react-redux'

function ScheduledAppointments() {

    const [appointments, setAppointments] = useState([])
    const userInfo = useSelector((state) => state.user.user)
    const id = userInfo?._id

    useEffect(() => {
        Axios.get(`/scheduled_appointments/${id}`).then((response) => {
            if (response.data) {
                setAppointments(response.data.appointments)
            }
            console.log(response.data.appointments)
        }).catch((error) => {
            console.log(error)
        })
    }, [id])

    return (
        <div>
            <ProfileBar />
            <ProfileHeader title='scheduled_appointment' />

            {
                appointments.map((appointment, index) => (
                    <>
                            <div key={index} className="bg-[#2D6A76] text-gray-300 flex justify-center mt-8 w-1/2 mx-auto py-5 rounded-lg font-inder">
                                <div className="mx-5">
                                    <div className="">
                                        {new Date(appointment.date).toLocaleString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            weekday: 'long', // to display the day
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                    <div className="">
                                        {new Date(appointment.date).toLocaleString('en-IN', {
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
                                <div className=" mx-5 flex  items-center">
                                    <button className='bg-[#E38569] px-8 rounded-md py-1 hover:border text-white border-white'>Join</button>
                                </div>
                            </div>

                    </>
                ))
            }

        </div>
    )
}

export default ScheduledAppointments
