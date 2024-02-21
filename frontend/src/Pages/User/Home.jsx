import React from 'react'
import  {Axios}  from '../../Axios/users'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../Slices/userSlice'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    Axios.get('/logout', { withCredentials: true }).then((response) => {
      if (response.data) {
        dispatch(userLogout())
        navigate('/login')
      }
    })
  }
  return (
    <div>
      <h1>home page</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Home