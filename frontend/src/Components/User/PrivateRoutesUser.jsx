import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { userCookie } from '../../Helpers/userHelpers'
import { useState } from 'react'
import { useEffect } from 'react'


function PrivateRoutesUser() {

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await userCookie();
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
        auth ? <Outlet /> : <Navigate to={'/login'} />
      }
    </div>
  )
}

export default PrivateRoutesUser
