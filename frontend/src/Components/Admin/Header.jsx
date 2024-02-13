import React from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { Axios } from '../../Axios/admin'
import { useNavigate } from 'react-router-dom';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../Slices/adminSlice';

function Header({onToggleSidebar}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const adminInfo = useSelector((state) =>state.admin.admin)

    const onLogout = ()=>{
        Axios.get('/logout',{ withCredentials: true }).then((response) =>{
          if(response.data){
            dispatch(adminLogout())
            navigate('/admin')
          }
        }).catch((error) =>{
          console.log(error);
        })
    }

  return (
    <div className="bg-[#2D6A76] py-4 px-7 flex justify-between items-center">
    <div className="flex items-center">
      <h1 className="text-white font-bold md:mr-5 sm:mr-8 mr-2">Take Care</h1>
      <MdOutlineMenu className="text-white ml-2" onClick={onToggleSidebar}/>
    </div>
    <button
      className="bg-[#E38569] text-white px-3 py-1 rounded-md hover:bg-[#e37969] focus:outline-none"
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
  )
}

export default Header
