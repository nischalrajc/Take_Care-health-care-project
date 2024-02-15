import React from 'react'

function Header() {
    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 mt-3 md:px-16 px-2 font-inter w-full'>
                <div className="bg-[#9CBCB7] border-gray-300 py-1 px-">Profile</div>
                <div className="bg-[#9CBCB7] border-b border-gray-300 py-1">Medical Records</div>
                <div className="bg-[#9CBCB7] border-b border-gray-300 py-1">Request</div>
                <div className="bg-[#9CBCB7] border-b border-gray-300 py-1">Scheduled Appointments</div>

            </div>

        </>
    )
}

export default Header
