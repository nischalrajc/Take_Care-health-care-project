import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  {Axios}  from '../../Axios/doctor';
import Swal from 'sweetalert2'


function OTP({formData,mailOTP}) {

    const [otp, setOtp] = useState(mailOTP);
    const [OTP,setOTP] = useState(null)
    const [resendDisabled, setResendDisabled] = useState(true);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState('')
   
    const navigate = useNavigate();
   

    const resendHandler = () => {
        const email = formData.get('email');
        Axios.get(`/mailvalidation/${email}`).then((response) => {
            if (response.data) {
                console.log(response.data.verificationOTP)
                setOtp(response.data.verificationOTP)
            }
        }).catch((error)=>{
            console.log("error",error)
        })

        setTimer(60);
        setResendDisabled(true);
    };

    useEffect(() => {
        const timerToShowResend = setTimeout(() => {
            setResendDisabled(false);
        }, 60000);

        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    setOtp(null)
                    // Enable the resend button when the timer reaches 0
                    setResendDisabled(false);
                    clearInterval(countdown);
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => {
            clearInterval(countdown);
            clearTimeout(timerToShowResend);
        };

    }, [otp]);

    const submitHandler = (e) => {
        e.preventDefault()
        if (otp === OTP) {
            Axios.post('/register', formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
                if (response.data) {
                    console.log(response.data)
                    navigate('/login')
                    Swal.fire(response.data.message);
                    // toast.success(response.data.message,
                    //     {
                    //         position: 'top-right',
                    //         autoClose: 1500,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: false,
                    //         draggable: true,
                    //     })
                }
            }).catch((error)=>{
                console.log("error",error)
            })
        } else {
            setError("invalid otp")
            setTimeout(()=>{
               setError("") 
            },2000)
        }

    }

    return (
        
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
                        <button type="submit" className="text-white bg-[#2D6A76] rounded-md  px-6 sm:px-8 py-2 sm:py-2">
                            Verify
                        </button>
                        <button
                            type="button"
                            onClick={resendHandler}
                            className={`ml-4 text-[#2D6A76] border-[#2D6A76] border-2 rounded-md px-6 py-2 ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={resendDisabled}
                        >
                            {resendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                        </button>
                    </div>
                </form>
            </div>
        
    )
}

export default OTP
