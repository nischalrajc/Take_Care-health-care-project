import React from 'react'
import { Axios } from '../../Axios/users'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../Slices/userSlice'
import NavBAr from '../../Components/User/NavBAr'

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
      <NavBAr />

      <div className="grid grid-cols-2">
        <div className=' flex flex-col items-center justify-center'>
          <h1  className='sm:text-4xl text-xs  font-medium'>Explore the Future of <br/> Healthcare with <br/> Take Care.</h1>
          <div className='sm:p-4 sm:mt-3 mt-1 text-xs sm:text-sm'>
            <button  className="text-white bg-[#2D6A76] rounded-md  px-4 sm:px-8 py-1 sm:py-2 ">
              TRY NOW
            </button>
          </div>
        </div>
        <div>
          <img className="" src="/takecarelandingpagepicture.jpg" alt="Icon" />
        </div>
      </div>


      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Home