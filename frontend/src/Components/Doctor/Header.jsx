import React from 'react'
import { Link } from 'react-router-dom'

function Header({title}) {
    
    return (
        <>
            {/* <div className="fixed top-0 left-0 right-0 z-40 pt-24 bg-white"> */}
                <div className='grid grid-cols-2 md:grid-cols-4 mt-4 md:px-16 px-2 font-inter w-full'>
                    <Link to="/doctor"><div className={`${title === 'profile' && 'bg-[#9CBCB7]'} border-b border-gray-300 py-1 px-1`}>Profile</div></Link>
                    <Link><div  className={`${title === 'medical' && 'bg-[#9CBCB7]'} border-b border-gray-300 py-1 px-1`}>Medical Records</div></Link>
                    <Link to="/doctors_slots"><div  className={`${title === 'slots' && 'bg-[#9CBCB7]'} border-b border-gray-300 py-1 px-1`}>Slots</div></Link>
                    <Link><div  className={`${title === 'appointments' && 'bg-[#9CBCB7]'} border-b border-gray-300 py-1 px-1`}>Scheduled Appointments</div></Link>
                </div>
            {/* </div> */}
        </>
    )
}

export default Header
