import React, { useState,useEffect } from 'react'
import { useNavigate , useLocation } from 'react-router-dom'
import { Axios } from '../../Axios/users'
import LoginNav from '../../Components/User/LoginNav'

function OTP() {
    const location = useLocation();
    const [otp, setOtp] = useState(null);
    const [OTP,setOTP] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.otp) {
          setOtp(location.state.otp);
        }
      }, [location.state,otp]);
    

    const submitHandler = (e) => {
        e.preventDefault()

        Axios.post('/OTP_validation',{otp}).then((response) =>{
            if(response.data){
                navigate('/login')
            }
        }).catch((error)=>{
            console.log("error",error)
        })
       
    }
    return (
        <div>
            <LoginNav />
            <div className='font-semibold mt-5 sm:text-4xl text-2xl'>
                Enter OTP 
            </div>

            <div>
                <form onSubmit={submitHandler}>
                    <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto ">
                        <div className='flex font-medium opacity-60 mt-6'>
                            <label htmlFor="">Enter OTP</label>
                        </div>
                        <div className='flex items-start '>
                            <input
                                type="otp"
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                className="w-full border-gray-500 border-2 rounded"
                                placeholder='email' style={{ paddingLeft: '10px' }} required/>
                        </div>
                    </div>
                    
                    <div className=' p-4 mt-3'>
                        <button type="submit" className="text-white bg-[#2D6A76] rounded-md  px-6 sm:px-32 py-2 sm:py-2">
                            Get OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OTP
