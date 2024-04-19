import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Axios } from '../../Axios/users';



function ProfileHeader({ title }) {

    const userInfo = useSelector((state) => state.user.user)
    const id = userInfo?._id

    const [appointment, setAppointment] = useState(false)

    useEffect(() => {
        Axios.get(`/scheduled_appointments/${id}`).then((response) => {
            if (response) {
                setAppointment(true)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }, [])

    return (
        <>

            <div className='grid grid-cols-2 md:grid-cols-4 mt-0 lg:px-16 px-2 text-xs sm:text-base font-inder w-full'>
                <Link to='/profile'><div className={`${title === 'profile' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 text-center cursor-pointer`}>Profile</div></Link>
                <Link to='/medical_report'><div className={`${title === 'MedicalRecords' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 text-center cursor-pointer`}>Medical Records</div></Link>
                <Link to='/payments'><div className={`${title === 'payments' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 text-center cursor-pointer`}>Payments</div></Link>
                <Link to='/scheduled_appointments'>
                    <div className={`${title === 'scheduled_appointment' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 text-center cursor-pointer `}>
                        <span className='relative'>  Scheduled Appointments

                            {
                                appointment && (
                                    <span className="absolute -right-3 -top-1">
                                        <span class="relative flex h-3 w-3">
                                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                            <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                        </span>
                                    </span>
                                )
                            }
                        </span>
                    </div>
                </Link>


            </div>

        </>
    )
}

export default ProfileHeader
