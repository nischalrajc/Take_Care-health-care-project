import React, { useState, useEffect } from 'react';
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import { Axios } from '../../Axios/admin';
import Pagination from '../../Components/Admin/Pagination';

function Users() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Users component mounted');
    return () => {
      console.log('Users component unmounted');
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await Axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBlockToggle = async (userId, isBlocked) => {
    setLoading(true);
    try {
      if (isBlocked) await Axios.put(`/unblock_user/${userId}`);
      else await Axios.put(`/block_user/${userId}`);
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(user => {
          if (user._id === userId) {
            return { ...user, blocked: !isBlocked };
          }
          return user;
        });
        return updatedUsers;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)} />
      <div className='flex flex-row'>
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
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 text-center">Loading...</td>
                        </tr>
                      ) : (
                        currentUsers.map((user, index) => (
                          <tr key={index} className="border-b transition duration-300 ease-in-out hover:cursor-pointer dark:hover:bg-[#DCE2B7]">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{indexOfFirstUser + index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.phoneNumber}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.gender}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button className={`bg-${user.blocked ? 'green' : 'red'}-400 text-white px-3 py-1 rounded me-1`} onClick={() => handleBlockToggle(user._id, user.blocked)}>
                                {user.blocked ? 'Unblock' : 'Block'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Pagination totalData={users.length} dataPerPage={usersPerPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  );
}

export default Users;
