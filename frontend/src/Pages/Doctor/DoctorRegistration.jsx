import React from 'react'
import LoginNav from '../../Components/User/LoginNav'
import { useState } from 'react'
import { Axios } from '../../Axios/doctor'
import { Link } from 'react-router-dom'

function DoctorRegistration() {
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [gender,setGender] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [specialisation,setSpecialisation] = useState('')
    const [bio,setBio] = useState('')
    const [error,setError] = useState('')


    
  const validateEmail = (email)=>{
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const validatePhone = (phone)=>{
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  }

   
    const submitHandler = (e) => {
        e.preventDefault();

        // Email validation
        if (!validateEmail(email)) {
            setError('Invalid email format');
            setTimeout(() => {
            setError('');
            }, 2000);
            return;
        }

            //   phone number validation
        if (!validatePhone(phone)) {
            setError('Invalid phone number format');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
  
        //   password validation
            if(password !== confirmPassword){
                setError('Password and confirm password do not match');

            setTimeout(() => {
                setError('');
            }, 2000);
            return
            }
       
        Axios.post('/register',{name,email,password,phone,gender,specialisation,bio})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    
       

  return (
    
       <div>
      <LoginNav/>
      <div className='font-semibold mt-5 sm:text-4xl text-2xl'>
       Doctors Registration
      </div>
      <div className='font-semibold mt-3 max-w-sm mx-auto sm:text-sm text-center px-2 sm:px-0'>
        <p className='text-black  opacity-70'>Complete this form to join our team. Share your qualifications, and we'll review your application promptly. </p>
      </div>
      
      <div>
      <form onSubmit={submitHandler}>

      <div class="flex flex-col sm:flex-row items-center mt-5 justify-center">
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
                        placeholder='name'style={{ paddingLeft: '10px'}} required/>
                    </div>
                </div>
                <div class="sm:w-1/2  max-w-fit ">
                    <div className='flex items-start font-semibold opacity-65'>
                    <label htmlFor="">Gender</label>
                    </div>
                    <div className=' flex items-start pl-3 mt-1'>
                         <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full px-16 border-gray-500 border-2 rounded"
                            style={{ paddingLeft: '10px' }}
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                         
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
                        placeholder='email'style={{ paddingLeft: '10px'}} required/>
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
                    <label htmlFor="">Specialisation</label>
                    </div>
                    <div className='flex items-start pl-3 mt-1'>
                        <input type="email" 
                        className="w-full border-gray-500 border-2 rounded" 
                        value={specialisation}
                        onChange={(e)=>setSpecialisation(e.target.value)}
                        placeholder='specialisation'style={{ paddingLeft: '10px'}} required/>
                    </div>
                </div>
                <div class="sm:w-1/2  max-w-fit ">
                    <div className='flex items-start  font-semibold opacity-65'>
                    <label htmlFor="">Bio</label>
                    </div>
                    <div className='flex items-start pl-3 mt-1'>
                        <input type="text" 
                        className="w-full border-gray-500 border-2 rounded" 
                        value={bio}
                        onChange={(e)=>setBio(e.target.value)}
                        placeholder='bio'style={{ paddingLeft: '10px'}} required/>
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
                        placeholder='Password'style={{ paddingLeft: '10px'}} required/>
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
                        placeholder='Confirm Password'style={{ paddingLeft: '10px'}} required/>
                    </div>
                </div>
            </div>

            {/* erorrr handling */}

            <div>
              {
                error && (
                  <div className='text-red-500 font-medium'>
                    {error}
                    </div>
                )
              }
              
            </div>

            <div className=' p-4 mt-3'>
                <button type="submit" className="text-white bg-[#2D6A76] rounded-md  px-6 sm:px-28 py-2 sm:py-2">
                    Sign in
                </button>
            </div>

            {/* <div className='flex flex-row justify-center'>
                <div className='font-medium opacity-60'>
                    Already have an account?
                </div >
                <div className='font-medium ps-1 text-[#2D6A76]'>Sign in</div>
            </div> */}
            <div className='text-sm font-semibold opacity-70 my-1'>
            Already have an account?<Link className='text-[#2D6A76] ps-1' to='/doctor_login'>Log in</Link> 
          </div>
        </form>
    </div>

    </div>
   
  )
}

export default DoctorRegistration
