import React from 'react'
import { Link } from 'react-router-dom'


function ProfileHeader({title}) {
    return (
        <>
           
            <div className='grid grid-cols-2 md:grid-cols-4 mt-0 md:px-16 px-2 font-inder w-full'>
                <Link to='/profile'><div className={`${title === 'profile' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 px-1 cursor-pointer`}>Profile</div></Link>
                <Link to='/medical_report'><div className={`${title === 'MedicalRecords' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 px-1 cursor-pointer`}>Medical Records</div></Link>
                <Link to='/payments'><div className={`${title === 'payments' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 px-1 cursor-pointer`}>Payments</div></Link>
                <Link to='/scheduled_appointments'><div className={`${title === 'scheduled_appointment' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 px-1 cursor-pointer`}>Scheduled Appointments</div></Link>
            </div>
           
        </>
    )
}

export default ProfileHeader
