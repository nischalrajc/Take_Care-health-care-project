import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../../Components/Admin/Header'
import Sidebar from '../../Components/Admin/Sidebar'
import { useNavigate } from 'react-router-dom'
import { Axios } from '../../Axios/admin'


function Specialisation() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [array, setArray] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        Axios.get('/specialisations', { withCredentials: true }).then((response) => {
            setArray(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [array])

    console.log(array)

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
                        <h1 className='text-2xl'>Specialisation</h1>
                        <button className='bg-black text-white px-4 py-2 rounded' onClick={() => { navigate('/admin/add_specialisation') }}>Add New</button>
                    </div>
                    {
                        array.length === 0 ? (
                            <h1>No Specialisation</h1>
                        ) : (
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4">Specialise</th>
                                                        <th scope="col" className="px-6 py-4">Image</th>
                                                        <th scope="col" className="px-6 py-4">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        array.map((specilise, index) => (
                                                            <tr key={index}
                                                                className="border-b transition duration-300 ease-in-out bg-[#E7EBD2]   dark:hover:bg-[#DCE2B7]">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{specilise.specialisation}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <img className="sm:w-28 w-10" src={specilise.image} alt="Icon" />
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis">{specilise.description}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <button className='bg-[#9CBCB7] px-3 py-1 rounded me-1'>view</button>
                                                                    {/* <button className='bg-[#E38569] px-3 py-1 rounded ' >remove</button> */}
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

export default Specialisation
