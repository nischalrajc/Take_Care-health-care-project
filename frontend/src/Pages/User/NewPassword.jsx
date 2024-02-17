import React, { useEffect } from 'react'
import { useState } from 'react'
import { Axios } from '../../Axios/users'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginNav from '../../Components/User/LoginNav'
import Swal from 'sweetalert2'


function NewPassword() {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError('Password and confirm password do not match');

            setTimeout(() => {
                setError('');
            }, 2000);
            return
        }

        Axios.patch('/newpassword', { email, password }, { withCredentials: true }).then((response) => {
            if (response.data.message) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/login')
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location.state])




    return (
        <div>
            <LoginNav />
            <div>
                <form onSubmit={submitHandler}>
                    <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto ">
                        <div className='flex font-medium opacity-60 mt-6'>
                            <label htmlFor="">New Password</label>
                        </div>
                        <div className='flex items-start '>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-gray-500 border-2 rounded"
                                placeholder='password' style={{ paddingLeft: '10px' }} required />
                        </div>
                    </div>

                    <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto ">
                        <div className='flex font-medium opacity-60 mt-4'>
                            <label htmlFor="">Confirm Password</label>
                        </div>
                        <div className='flex items-start mt-1'>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border-gray-500 border-2 rounded"
                                placeholder='password' style={{ paddingLeft: '10px' }} required />
                        </div>
                    </div>

                    {/* erorrr handling */}

                    {
                        error && (
                            <div className='text-red-400 font-medium'>
                                {error}
                            </div>
                        )
                    }


                    <div className=' p-4 mt-3'>
                        <button type="submit" className="text-white bg-[#2D6A76] rounded-md  px-6 sm:px-32 py-2 sm:py-2">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPassword
