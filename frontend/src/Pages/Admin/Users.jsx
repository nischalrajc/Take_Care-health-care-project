import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import { Axios } from '../../Axios/admin'

function Users() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [array, setArray] = useState([]);


  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const blockUser = (userId) => {

    Axios.put(`/block_user/${userId}`, { withCredentials: true }).then((response) => {
      if (response.data.message) {
        console.log("user blocked")
      }
    }).catch((error) => {
      console.log(error)
    })

  }

  const unblockUser = (userId) =>{
    Axios.put(`/unblock_user/${userId}`, { withCredentials: true }).then((response) => {
      if (response.data.message) {
        console.log("user unblocked")
      }
    }).catch((error) => {
      console.log(error)
    })

  }


  useEffect(() => {
    Axios.get('/users', { withCredentials: true }).then((response) => {
      setArray(response.data)
    }).catch((error) => {
      console.log(error)
    })
  },[])

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />

      <div className=' flex flex-row'>
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} />

        <div className='w-full px-8 mt-8'>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Email</th>
                        <th scope="col" className="px-6 py-4">PhoneNumber</th>
                        <th scope="col" className="px-6 py-4">Gender</th>
                        <th scope="col" className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        array.map((user, index) => (
                          <tr key={index}
                            className="border-b transition duration-300 ease-in-out   dark:hover:bg-[#DCE2B7]">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.phoneNumber}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.gender}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {user.blocked ? (
                                <button className='bg-green-400 text-white px-3 py-1 rounded me-1' onClick={() => unblockUser(user?._id)}>
                                  Unblock
                                </button>
                              ) : (
                                <button className='bg-red-400 text-white px-3 py-1 rounded me-1' onClick={() => blockUser(user?._id)}>
                                  Block
                                </button>
                              )}
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

        </div>

      </div>

    </>
  )
}

export default Users
