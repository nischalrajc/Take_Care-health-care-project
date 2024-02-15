import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { adminCookie } from '../../Helpers/adminHelper'

function PrivateAdmin() {
    const authenticate = adminCookie()
    console.log(authenticate,"kkkkkkk")

  return (
    <div>
      {
        authenticate ? <Outlet/> : <Navigate to={'/admin'}/>
      }
    </div>
  )
}

export default PrivateAdmin
