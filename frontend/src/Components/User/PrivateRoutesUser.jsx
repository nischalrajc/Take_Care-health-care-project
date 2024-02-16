import React from 'react'
import { userCookie } from '../../Helpers/userHelpers'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutesUser() {
    const authenticate = userCookie()
    return (
        <div>
            {
                authenticate ? <Outlet /> : <Navigate to={'/login'} />
            }
        </div>
    )
}

export default PrivateRoutesUser
