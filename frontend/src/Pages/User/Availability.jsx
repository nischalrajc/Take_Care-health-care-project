
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/User/NavBAr'
import { Axios } from '../../Axios/users'
import { Link } from 'react-router-dom'

function Availability() {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        Axios.get('/checkDoctorsAvailable')
            .then((response) => {
                if (response.data) {
                    setDoctors(response.data.doctors)
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow flex justify-center mx-auto mt-10">
                {
                    doctors.length > 0 ? (
                        doctors.map((doctor, index) => (
                            <div key={index} className="sm:w-fit md:w-5/6 mx-2 md:mx-12 lg:mx-24 xl:mx-32 justify-center flex flex-col sm:flex-row my-4 py-1 text-sm">
                                <div className="sm:w-1/5 md:w-1/4 mb-2 sm:mb-0">
                                    <div className="border rounded-md border-black text-white sm:mx-auto sm:h-24 md:h-28 md:w-28 sm:w-20" style={{ overflow: 'hidden' }}>
                                        <Link to={`/doctor_details/${doctor?.doctorId?._id}`}>
                                            <img className="w-full h-full object-cover hover:cursor-pointer" src={doctor?.doctorId?.image} alt='doctor' />
                                        </Link>
                                    </div>
                                    <div className="text-center">{doctor?.doctorId?.name}</div>
                                </div>

                                <Link to={`/doctor_details/${doctor?.doctorId?._id}`}>
                                    <div className="bg-[#DFEBE9] border rounded-md flex flex-col justify-center sm:h-20 md:h-28 w-full sm:w-3/4 lg:w-4/5 px-2 py-2 md:py-0">
                                        <div className="text-start">{doctor?.doctorId?.specialisation}</div>
                                        <div className="text-start overflow-hidden" style={{ maxHeight: '4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {doctor?.doctorId?.bio}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col justify-center w-full h-full bg-[#DFEBE9] rounded-md p-5">
                            <h2 className="text-2xl font-semibold mb-2">No Doctors Available Today</h2>
                            <p className="mb-4">We're sorry, but there are no available appointments for today. Please book an appointment early to secure your slot.</p>
                            <Link to="/specialist">
                                <button className="bg-[#2D6A76] text-white px-4 py-2 rounded-md hover:bg-[#6aa2ad]">
                                    Book an Appointment
                                </button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Availability
