import React, { useEffect, useState , useRef } from 'react'
import LoginNav from '../../Components/User/LoginNav'
import {Axios as DoctorAxios} from '../../Axios/doctor'
// import {Axios as UserAxios} from '../../Axios/users'
import * as UserAxios from '../../Axios/users';
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate,useLocation } from 'react-router-dom';


function ForgetPassword() {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const axiosRef = useRef(UserAxios);

    const navigate = useNavigate()
    const location = useLocation()

    

    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(email);
    };

    useEffect(()=>{
        if (location.state && location.state.doctor) {
            axiosRef.current = DoctorAxios;
        } else {
            axiosRef.current = UserAxios;
        }
    }, [location.state])

    const submitHandler = (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setError('Invalid email format');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        setLoading(true)

        console.log("mmmmmmmmmmm",axiosRef.current)
        axiosRef.current.post('/forget_password', { email }).then((response) => {
            if (response.data.otp) {
                setLoading(false)
                navigate('/forget_password/otp',{state:{otp:response.data.otp,email:email}})
            }
        }).catch((error) => {
            console.log("errorooooooooooooooooooooo", error)
        })

    }

    

    return (
        <div>
            <LoginNav />
            <div className='font-semibold mt-5 sm:text-4xl text-2xl'>
                Enter your E-mail address
            </div>
            <div className='font-semibold mt-3 max-w-sm mx-auto sm:text-sm text-center px-2 sm:px-0'>
                <p className='text-black  opacity-70'>A otp is send to the respective mail id please check and validate </p>
            </div>

            <div>
                <form onSubmit={submitHandler}>
                    <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto ">
                        <div className='flex font-medium opacity-60 mt-6'>
                            <label htmlFor="">Email</label>
                        </div>
                        <div className='flex items-start '>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-gray-500 border-2 rounded"
                                placeholder='email' style={{ paddingLeft: '10px' }} required />
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
                            Get OTP
                        </button>
                    </div>
                </form>
            </div>

            {
                loading && (
                    <BeatLoader
                        color={'#2D6A76'}
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )
            }
        </div>
    )
}

export default ForgetPassword
