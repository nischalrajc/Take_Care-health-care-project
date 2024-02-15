import React, { useEffect } from 'react'
import LoginNav from '../../Components/User/LoginNav'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Axios } from '../../Axios/doctor'
import { useSelector,useDispatch } from 'react-redux'
import { doctorLogin } from '../../Slices/doctorSlice'
import Swal from 'sweetalert2'


function LoginDoctor() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const doctorInfo = useSelector((state)=>state.doctor.doctor)

  useEffect(()=>{
    if(doctorInfo){
        navigate('/doctor')
    }
  })

  const validateEmail = (email)=>{
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
};


  const submitHandler = async(e) =>{
    e.preventDefault()
    
            // Email validation
            if (!validateEmail(email)) {
              setError('Invalid email format');
              setTimeout(() => {
              setError('');
              }, 2000);
              return;
          }

          Axios.post('/login',{email,password},  { withCredentials: true }).then((response) => {
            if(response.data.authorisation){
                Swal.fire({
                    title: "Cannot Login?",
                    text: "you are not authorised yet?",
                    icon: "question"
                  });
                  return
            }
            if(response.data){
                dispatch(doctorLogin({...response.data}))
                navigate('/doctor')
            }else{
                setError("Incorrect email and password")
                setTimeout(() => {
                    setError('')
                },2000)
            }
        }).catch((error) => {
            console.log(error)
        })
  }

  return (
    <div>
      <LoginNav/>
      <div className='font-semibold mt-5 sm:text-3xl text-xl'>
       Log in to your account
      </div>

      <div>
        <form onSubmit={submitHandler}>
                <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto">
                    <div className='flex font-medium opacity-60 mt-6'>
                    <label htmlFor="">Email</label>
                    </div>
                    <div className='flex items-start '>
                        <input 
                        type="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        className="w-full border-gray-500 border-2 rounded" 
                        placeholder='email'style={{ paddingLeft: '10px'}} required/>
                    </div>
                </div>

                <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto">
                    <div className='flex font-medium opacity-60 mt-4'>
                    <label htmlFor="">Password</label>
                    </div>
                    <div className='flex items-start mt-1'>
                        <input 
                        type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        className="w-full border-gray-500 border-2 rounded" 
                        placeholder='password'style={{ paddingLeft: '10px'}} required/>
                    </div>
                </div>

                <div className=' w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex items-start font-inter text-sm font-mediumbold text-[#2D6A76] mt-4'>
                    Forget password ?
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
                    Log in
                </button>
            </div>
        </form>
      </div>
      <div className='text-sm font-semibold opacity-70'>
               Take Care Provider?<Link className='text-[#2D6A76] ps-1' to='/doctor_register'>Request</Link> 
            </div>
    </div>
  )
}

export default LoginDoctor

