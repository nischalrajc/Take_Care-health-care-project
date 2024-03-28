import React from 'react'
import { Link } from 'react-router-dom'

function Header({title}) {
    
    return (
        <>
           
                <div className='grid grid-cols-2 md:grid-cols-4 mt-0 md:px-16 px-2 font-inder w-full'>
                    <Link to="/doctor"><div className={`${title === 'profile' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 px-1`}>Profile</div></Link>
                    <Link><div  className={`${title === 'medical' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 px-1`}>Medical Records</div></Link>
                    <Link to="/doctors_slots"><div  className={`${title === 'slots' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 px-1`}>Slots</div></Link>
                    <Link to="/doctor/scheduled_appointments"><div  className={`${title === 'appointments' && 'bg-[#2D6A76]'} border-b border-gray-300 py-1 sm:py-2 px-1`}>Scheduled Appointments</div></Link>
                </div>
           
        </>
    )
}

export default Header
