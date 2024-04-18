import React from 'react'
import Header from '../../Components/Admin/Header'
import Sidebar from '../../Components/Admin/Sidebar'
import { useState, useEffect } from 'react'
import { Axios } from '../../Axios/admin'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Pagination from '../../Components/Admin/Pagination'


function Doctors() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [array, setArray] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [dataPerPage,setDataPerPage] = useState(6)


    const navigate = useNavigate()

    useEffect(() => {
        Axios.get('/doctors', { withCredentials: true }).then((response) => {
            setArray(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [array])

    const lastUserIndex = currentPage * dataPerPage
    const firstUserIndex = lastUserIndex - dataPerPage

    const currentData = array.slice(firstUserIndex,lastUserIndex)

    const viewDoctorHandler = async(doctorId) =>{
        navigate(`/admin/doctors/view/${doctorId}`)
    }

    const doctorRemoveHandler = async (doctorId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`/delete_doctor/${doctorId}`, { withCredentials: true }).then((response) => {
                    if (response.data) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                }).catch((error) =>{
                    console.log("failed to delete",error)
                })

            }
        });
    }


    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            <div className=' flex flex-row'>
                <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
                <div className='w-full px-8 mt-8'>
                    <div className='w-full flex justify-between'>
                        <h1 className='text-2xl'>Doctors</h1>
                        <button className='bg-black text-white px-4 py-2 rounded' onClick={() => { navigate('/admin/add_doctors') }}>Add New</button>
                    </div>
                    {
                        array.length === 0 ? (
                            <h1>No doctors</h1>
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
                                                        <th scope="col" className="px-6 py-4">Fees</th>
                                                        <th scope="col" className="px-6 py-4">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentData.map((doctor, index) => (
                                                            <tr key={index}
                                                                className="border-b transition duration-300 ease-in-out bg-[#E7EBD2]   dark:hover:bg-[#DCE2B7]">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{doctor.name}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{doctor.email}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{doctor.phoneNumber}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{doctor.specialisation}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{doctor.fees}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <button className='bg-[#9CBCB7] px-3 py-1 rounded me-1' onClick={() => viewDoctorHandler(doctor?._id)}>view</button>
                                                                    <button className='bg-[#E38569] px-3 py-1 rounded ' onClick={() => doctorRemoveHandler(doctor?._id)}>remove</button>
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

                    <Pagination totalData = {array.length} dataPerPage={dataPerPage} setCurrentPage={setCurrentPage}/>
                </div>
            </div>
        </div>
    )
}

export default Doctors
