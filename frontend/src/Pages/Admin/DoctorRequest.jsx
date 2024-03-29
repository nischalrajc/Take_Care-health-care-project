import React from 'react'
import Header from '../../Components/Admin/Header'
import Sidebar from '../../Components/Admin/Sidebar'
import { useState, useEffect } from 'react'
import { Axios } from '../../Axios/admin'
import Swal from 'sweetalert2'


function DoctorRequest() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [array, setArray] = useState([]);

    const BASE_URL = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        Axios.get('/doctors_request', { withCredentials: true }).then((response) => {
            setArray(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [array])

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const doctorAcceptHandler = (doctorId) => {

        Axios.put(`/doctor_Accept/${doctorId}`, { withCredentials: true }).then((response) => {
            if (response) {
                console.log("updated")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const doctorRejectHandler = (doctorid) => {
        Axios.put(`/doctor_reject/${doctorid}`, { withCredentials: true }).then((response) => {
            if (response) {
                Swal.fire(response.data.message);
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }


    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            <div className=' flex flex-row'>
                <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
                <div className='w-full px-8 mt-8'>
                    <div className='w-full flex justify-between'>
                        <h1 className='text-2xl'>Request</h1>
                    </div>
                    {
                        array.length === 0 ? (
                            <h1>no doctor request yet</h1>
                        ) : (
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4">Name</th>
                                                        <th scope="col" className="px-6 py-4">Email</th>
                                                        <th scope="col" className="px-6 py-4">PhoneNumber</th>
                                                        <th scope="col" className="px-6 py-4">Specialise</th>
                                                        {/* <th scope="col" className="px-6 py-4">Bio</th> */}
                                                        <th scope="col" className="px-6 py-4">Gender</th>
                                                        <th scope="col" className="px-6 py-4">Certificate</th>
                                                        <th scope="col" className="px-6 py-4">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        array.map((doctor, index) => (
                                                            <tr key={index}
                                                                className="border-b transition duration-300 ease-in-out bg-[#E7EBD2]   dark:hover:bg-[#DCE2B7]">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{doctor.name}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{doctor.email}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{doctor.phoneNumber}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{doctor.specialisation}</td>
                                                                {/* <td className="whitespace-nowrap px-6 py-4">{doctor.bio}</td> */}
                                                                <td className="whitespace-nowrap px-6 py-4">{doctor.gender}</td>
                                                                <td className="whitespace-nowrap px-6 py-4 font-normal">
                                                                    <button
                                                                        className='bg-[#9CBCB7] px-3 py-1 rounded me-1'
                                                                        onClick={() => {
                                                                            if (doctor.registration_certicatate) {
                                                                                const pdfPath = `${BASE_URL}/uploads/${doctor.registration_certicatate}`;
                                                                                window.open(pdfPath, '_blank');
                                                                            }
                                                                        }}
                                                                    >
                                                                        View PDF
                                                                    </button>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <button className='bg-[#9CBCB7] px-3 py-1 rounded me-1' onClick={() => doctorAcceptHandler(doctor?._id)}>Accept</button>
                                                                    <button className='bg-[#af5c49] px-3 py-1 rounded ' onClick={() => doctorRejectHandler(doctor?._id)}>Ignore</button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default DoctorRequest
