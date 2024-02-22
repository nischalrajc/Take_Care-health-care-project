import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { adminCookie } from '../../Helpers/adminHelper'
import { useState,useEffect } from 'react';

function PrivateAdmin() {
  
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await adminCookie();
            setAuth(response);
        } catch (error) {
            console.error("Error fetching data:", error);
            setAuth(false);
        }
    };

    fetchData();
}, []);

if (auth === null) {
    // Loading state, you might want to show a loading spinner here
    return null;
}

  return (
    <div>
      {
        auth ? <Outlet /> : <Navigate to={'/admin'} />
      }
    </div>
  )
}

export default PrivateAdmin
