import React from 'react'
import { Link } from 'react-router-dom'

function DoctorsCard({ array, appointment ,setShowModal }) {

    const handleShowModal = ()=>{
        setShowModal(true)
    }

    return (
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-4 sm:mx-20 py-8'>
                {
                    array?.map((doctor, index) => (
                        <>
                            <div>
                                <div key={index} className='border rounded-md border-black mx-2 sm:h-96 h-48' style={{ overflow: 'hidden' }} >
                                    <Link to={`/doctor_details/${doctor._id}`}><img className="w-full h-full object-cover" src={doctor?.image} alt="doctors" /></Link>
                                </div>
                                <div className="mt-2">{doctor?.name}</div>
                                {
                                    appointment && (
                                        <div className="mt-2">
                                            <button className='bg-[#E38569] text-white px-6 rounded-md py-1' onClick={handleShowModal}>
                                                Schedule Appointment
                                            </button>
                                        </div>
                                    )
                                }
                            </div>

                        </>
                    ))
                }

            </div>
        </div>
    )
}

export default DoctorsCard
