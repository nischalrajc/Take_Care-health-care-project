
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import {doctorCookie} from '../../Helpers/doctorHelpers'
import { useState,useEffect } from 'react';


function DoctorPrivateRoutes() {
    const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await doctorCookie();
            setAuth(response);
        } catch (error) {
            console.error("Error fetching data:", error);
            setAuth(false);
        }
    };

    fetchData();
}, []);


if (auth === null) {
    
    return null;
}

  return (
    <div>
      {
        auth ? <Outlet /> : <Navigate to={'/doctor_login'} />
      }
    </div>
  )
}

export default DoctorPrivateRoutes

