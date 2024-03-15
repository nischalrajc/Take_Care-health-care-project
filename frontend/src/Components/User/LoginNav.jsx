import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginNav() {
  const navigate = useNavigate()

  const logoHandler= ()=>{
    navigate('/')
  }

  return (
    <div>
        <div className="mx-5 py-3 px-3 border-b border-gray-300 hover:cursor-pointer" onClick={logoHandler}>
          <div className="mx-auto flex items-center">
            <img className="w-52" src="/take-care-logo.png" alt="Icon" />
          </div>
        </div>
    </div>
  )
}

export default LoginNav