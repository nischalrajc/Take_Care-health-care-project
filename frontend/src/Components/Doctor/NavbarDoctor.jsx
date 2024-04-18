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
                console.log(response.data)
                dispatch(doctorLogout())
                navigate('/doctor_login')
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }

    return (
        <div>
            <div className="sm:mx-5 flex justify-between py-3 px-3 border-b  border-gray-300">
                <div className="flex items-center pr-5">
                    <img className="min-w-20 max-w-20 md:min-w-48 md:max-w-48" src="/take-care-logo.png" alt="Logo" />
                </div>
                <div className='font-inder flex items-center mr-8'>
                    <div className="mr-8">
                        <Link>Home</Link>
                    </div>
                    <div className="">
                        <button className='border border-black rounded px-3 py-1' onClick={logoutHandler}>logout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NavbarDoctor
