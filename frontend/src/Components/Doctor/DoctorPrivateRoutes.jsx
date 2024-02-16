import React from 'react'
import { doctorCookie } from '../../Helpers/doctorHelpers'
import { Outlet, Navigate } from 'react-router-dom'

function DoctorPrivateRoutes() {
    const authenticate = doctorCookie()

    return (
        <div>
            {
                authenticate ? <Outlet /> : <Navigate to={'/doctor_login'} />
            }
        </div>
    )
}

export default DoctorPrivateRoutes
