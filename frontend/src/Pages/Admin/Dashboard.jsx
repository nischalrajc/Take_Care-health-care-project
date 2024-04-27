import React, { useEffect, useState } from 'react'
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import BarChart from '../../Components/Admin/BarChart';
import { Axios } from '../../Axios/admin';

function Dashboard() {
    const [usersCount, setUsersCount] = useState('')
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [userData, setUserData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Users Gained",
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)', // Jan
                'rgba(54, 162, 235, 0.5)', // Feb
                'rgba(255, 206, 86, 0.5)', // Mar
                'rgba(75, 192, 192, 0.5)', // Apr
                'rgba(153, 102, 255, 0.5)', // May
                'rgba(255, 159, 64, 0.5)', // Jun
                'rgba(255, 99, 132, 0.5)', // Jul
                'rgba(54, 162, 235, 0.5)', // Aug
                'rgba(255, 206, 86, 0.5)', // Sep
                'rgba(75, 192, 192, 0.5)', // Oct
                'rgba(153, 102, 255, 0.5)', // Nov
                'rgba(255, 159, 64, 0.5)'  // Dec
            ],
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Axios.get('/usersData');
                const monthlyUserCounts = response.data.monthlyUserCounts;
                const usersCount = response.data.totalCount
                setUsersCount(usersCount)
                setUserData(prevState => ({
                    ...prevState,
                    datasets: [{
                        ...prevState.datasets[0],
                        data: monthlyUserCounts,
                    }]
                }));
            } catch (error) {
                console.log(error)
            }
        };

        fetchUserData();

    }, []);

    return (
        <div>
            <Header onToggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)} />
            <div className='flex flex-row'>
                <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
                <div className='w-full px-8 mt-8'>
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                        <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                            <div className="bg-thirdShade rounded-lg px-4 py-4">
                                <div className="flex justify-center mb-3 font-protest"><p>Users Count</p></div>
                                {userData && userData.datasets && <BarChart chartData={userData} />}
                                <div className="flex justify-center mt-3">
                                    <p className="font-protest">Total Users : {usersCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
