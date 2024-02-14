import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function PrivateAdmin() {
    const adminInfo = useSelector((state)=>state.admin.admin)

  return (
    <div>
      {
        adminInfo ? <Outlet/> : <Navigate to={'/admin'}/>
      }
    </div>
  )
}

export default PrivateAdmin
