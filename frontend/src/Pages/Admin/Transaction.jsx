import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../../Components/Admin/Header'
import Sidebar from '../../Components/Admin/Sidebar'
import { Axios } from '../../Axios/admin'
import Pagination from '../../Components/Admin/Pagination'

function Transaction() {

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [array, setArray] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(6)

    useEffect(() => {
        Axios.get('/transactions').then((response) => {
            setArray(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const lastUserIndex = currentPage * dataPerPage
    const firstUserIndex = lastUserIndex - dataPerPage

    const currentData = array.slice(firstUserIndex, lastUserIndex)

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
                        <h1 className='text-2xl'>Transactions</h1>
                    </div>
                    {
                        array.length === 0 ? (
                            <h1>No Transactions</h1>
                        ) : (
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4">Date</th>
                                                        <th scope="col" className="px-6 py-4">Doctor</th>
                                                        <th scope="col" className="px-6 py-4">Patient</th>
                                                        <th scope="col" className="px-6 py-4">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentData.map((item, index) => (
                                                            <tr key={index}
                                                                className="border-b transition duration-300 ease-in-out hover:cursor-pointer dark:hover:bg-[#DCE2B7]">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    {new Date(item.date).toLocaleDateString('en-IN', {
                                                                        timeZone: 'Asia/Kolkata',
                                                                        weekday: 'long',
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                    })}
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    {item.doctor.name}
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    {item.user.name}
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    {item.doctor.fees}
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

                    <Pagination totalData={array.length} dataPerPage={dataPerPage} setCurrentPage={setCurrentPage} />

                </div>
            </div>

        </div>
    )
}

export default Transaction
