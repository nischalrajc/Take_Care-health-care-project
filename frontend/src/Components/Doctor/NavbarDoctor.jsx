import React from 'react'
import { Link } from 'react-router-dom'
import { Axios } from '../../Axios/doctor'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { doctorLogout } from '../../Slices/doctorSlice'

function NavbarDoctor() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        Axios.get('/logout', { withCredentials: true }).then((response) => {
            if (response.data) {
                dispatch(doctorLogout())
                navigate('/doctor_login')
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }
    return (
        <div>

            <div className="sm:mx-5 mx-1 flex flex-row justify-between py-3 px-3 border-b  border-gray-300">
                <div className="flex items-center ps-5">
                    <img className="min-w-48 max-w-48" src="take-care-logo.png" alt="Icon" />
                </div>
                <div className='font-inder flex mx-20'>
                    <div className=" flex items-center sm:me-16">
                        <Link>Home</Link>
                    </div>
                    <div className=" flex mx-10 items-center">
                        <button className='border border-black rounded px-3 py-1' onClick={logoutHandler}>logout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NavbarDoctor
