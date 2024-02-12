import React from 'react'
import { IoMdAnalytics, IoMdMedkit, IoMdMedal, IoIosCash } from 'react-icons/io';
import { FaUsers } from "react-icons/fa";
import { MdAddAlert } from "react-icons/md";
import { Link } from 'react-router-dom';


function Sidebar({isSidebarCollapsed}) {

  const sidebarItems = [
    { icon: <IoMdAnalytics className="mr-2" />, label: 'Dashboards', link: '/admin/dashboards' },
    { icon: <FaUsers className="mr-2" />, label: 'Users', link: '/admin/users' },
    { icon: <IoMdMedkit className="mr-2" />, label: 'Doctors', link: '/admin/doctors' },
    { icon: <IoMdMedal className="mr-2" />, label: 'Specialisation', link: '/admin/specialisation' },
    { icon: <IoIosCash className="mr-2" />, label: 'Transaction', link: '/admin/transaction' },
    { icon: <MdAddAlert className="mr-2" />, label: 'Requests', link: '/admin/doctor_request' },
  ];

  return (
    <div className={`bg-[#2D6A76] text-white flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'} ${isSidebarCollapsed ? 'h-screen' : 'min-h-screen'}`}>
      <nav className="flex-1 flex flex-col">
        {sidebarItems.map((item, index) => (
          <Link key={index} to={item.link} className="p-4 hover:bg-[#45909e] flex items-center">
            {item.icon}
            {isSidebarCollapsed ? null : item.label}
          </Link>
        ))}
      </nav>
    </div>
  );

}

export default Sidebar
