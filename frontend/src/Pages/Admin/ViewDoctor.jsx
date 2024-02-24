import React from 'react'
import Header from '../../Components/Admin/Header'
import { useState } from 'react';
import Sidebar from '../../Components/Admin/Sidebar';
import { useParams } from 'react-router-dom';
import DoctorForm from '../../Components/Admin/DoctorForm';

function ViewDoctor() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const { doctorId } = useParams()

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            <div className=' flex flex-row'>
                <Sidebar isSidebarCollapsed={isSidebarCollapsed} />

                <DoctorForm doctorId={doctorId}/>
            </div>
        </div>
    )
}

export default ViewDoctor
