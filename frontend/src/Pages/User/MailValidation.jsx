import React, { useState } from 'react'
import LoginNav from '../../Components/User/LoginNav'
import { Axios } from '../../Axios/users';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

function MailValidation() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(email);
    };


    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        
        if (!validateEmail(email)) {
            setError('Invalid email format');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        Axios.post('/getOtp',{email}).then((response) =>{
            if(response.data.otp){
                setLoading(false)
                navigate('/login/otp', { state: { otp: response.data.otp } });
            }
        }).catch((error)=>{
            console.log("error",error)
        })
       
    }
    return (
        <div>
            <LoginNav />
            <div className='font-semibold mt-5 sm:text-4xl text-2xl'>
                Enter Your Email
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
                                placeholder='email' style={{ paddingLeft: '10px' }} required/>
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

export default MailValidation
