import React from 'react'

function Header() {
    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 mt-3 md:px-16 px-2 font-inter w-full'>
                <div className="bg-green-400 border-b border-gray-300 py-1 px-">Profile</div>
                <div className="bg-red-300 border-b border-gray-300 py-1">Medical Records</div>
                <div className="bg-orange-300 border-b border-gray-300 py-1">Request</div>
                <div className="bg-yellow-300 border-b border-gray-300 py-1">Scheduled Appointments</div>

            </div>

        </>
    )
}

export default Header
