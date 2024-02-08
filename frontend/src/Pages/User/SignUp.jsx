import React from 'react'
import LoginNav from '../../Components/User/LoginNav'
import { useState } from 'react'


function SignUp() {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [passwordError,setPasswordError] = useState('')

  const submitHandler = async(e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
      setPasswordError('Password and confirm password do not match');

      setTimeout(() => {
        setPasswordError('');
      }, 2000);
    }
  }

  return (
    <div>
      
      <LoginNav/>
      <div className='font-semibold mt-3 sm:text-4xl text-2xl'>
       Sign in to your account
      </div>
      <div className='font-semibold mt-3 max-w-sm mx-auto sm:text-sm text-center px-2 sm:px-0'>
        <p className='text-black  opacity-70'>Begin your wellness journey. Sign up for comprehensive health support and embrace a healthier life</p>
      </div>
      
      <div>
      <form onSubmit={submitHandler}>

            <div class="flex flex-col sm:flex-row items-center justify-center">
                <div class="sm:w-1/2 sm:max-w-fit  ">
                    <div className=' flex items-start  font-semibold opacity-65'>
                    <label htmlFor="">Name</label>
                    </div>
                    <div className='flex items-start pl-3 mt-1'>
                        <input 
                        type="text" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        className="w-full border-gray-500 border-2 rounded" 
                        placeholder='name'style={{ paddingLeft: '10px'}}/>
                    </div>
                </div>
                <div class="sm:w-1/2  max-w-fit ">
                    <div className='flex items-start font-semibold opacity-65'>
                    <label htmlFor="">Gender</label>
                    </div>
                    <div className='flex items-start pl-3 mt-1'>
                        <input type="text" 
                        value={gender}
                        onChange={(e)=>setGender(e.target.value)}
                        className="w-full border-gray-500 border-2 rounded" 
                        placeholder='gender'style={{ paddingLeft: '10px'}}/>
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center">
                <div class="sm:w-1/2 sm:max-w-fit  ">
                    <div className=' flex items-start font-semibold opacity-65'>
                    <label htmlFor="">Email</label>
                    </div>
                    <div className='flex items-start pl-3 mt-1'>
                        <input type="email" 
                        className="w-full border-gray-500 border-2 rounded" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder='email'style={{ paddingLeft: '10px'}}/>
                    </div>
                </div>
                <div class="sm:w-1/2  max-w-fit ">
                    <div className='flex items-start  font-semibold opacity-65'>
                    <label htmlFor="">Phone number</label>
                    </div>
                    <div className='flex items-start pl-3 mt-1'>
                        <input type="text" 
                        className="w-full border-gray-500 border-2 rounded" 
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        placeholder='phone'style={{ paddingLeft: '10px'}}/>
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center">
                <div class="sm:w-1/2 sm:max-w-fit  ">
                    <div className=' flex items-start font-semibold opacity-65'>
                    <label htmlFor="">Password</label>
                    </div>
                    <div className='flex items-start pl-3 mt-1'>
                        <input type="password" 
                        className="w-full border-gray-500 border-2 rounded" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder='Password'style={{ paddingLeft: '10px'}}/>
                    </div>
                </div>
                <div class="sm:w-1/2  max-w-fit ">
                    <div className='flex items-start font-semibold opacity-65 '>
                    <label htmlFor="">Confirm Password</label>
                    </div>
                    <div className='flex items-start pl-3 mt-1'>
                        <input type="password" 
                        className="w-full border-gray-500 border-2 rounded" 
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'style={{ paddingLeft: '10px'}}/>
                    </div>
                </div>
            </div>

            {/* erorrr handling */}

            <div>
              {
                passwordError && (
                  <div className='text-red-500 font-normal'>
                    {passwordError}
                    </div>
                )
              }
              
            </div>

            <div className=' p-4 mt-3'>
                <button type="submit" className="text-white bg-[#2D6A76] rounded  px-6 sm:px-28 py-2 sm:py-2">
                    Sign in
                </button>
            </div>

            <div className='flex flex-row justify-center'>
                <div className='font-medium opacity-60'>
                    Already have an account?
                </div >
                <div className='font-medium ps-1 text-[#2D6A76]'>Sign in</div>
            </div>
            
      </form>
    </div>

    </div>
    
  )
}

export default SignUp

