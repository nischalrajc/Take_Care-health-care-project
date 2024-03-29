import React from 'react'
import LoginNav from '../../Components/User/LoginNav'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import  {Axios}  from '../../Axios/users'
import { toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";


function SignUp() {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [Error, SetError] = useState('')
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (!name || !gender || !email || !phone || !password || !confirmPassword) {
      SetError('All fields are required');
      setTimeout(() => {
        SetError('');
      }, 2000);
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      SetError('Invalid email format');
      setTimeout(() => {
        SetError('');
      }, 2000);
      return;
    }

    //   phone number validation
    if (!validatePhone(phone)) {
      SetError('Invalid phone number format');
      setTimeout(() => {
        SetError('');
      }, 2000);
      return;
    }

    //   password validation
    if (password !== confirmPassword) {
      SetError('Password and confirm password do not match');

      setTimeout(() => {
        SetError('');
      }, 2000);
      return
    }

    setLoading(true)

    Axios.post("/signup", { name: name, email: email, phoneNumber: phone, password: password, gender: gender }).then((response) => {
      if (response.data.otp) {
        setLoading(false)
        navigate('/otp', { state: { otp: response.data.otp, email: email, name: name, password: password, gender: gender, phone: phone } })
        
      }

      if (response.data.error) {
        return toast.error(response.data.error)
      }

    }).catch((err) => {
      toast.error("signup failed try again")
    })
  }

  return (
    <>

      <div>

        <LoginNav />
        <div className='font-semibold mt-5 sm:text-4xl text-2xl'>
          Sign in to your account
        </div>
        <div className='font-semibold mt-3 max-w-sm mx-auto sm:text-sm text-center px-2 sm:px-0'>
          <p className='text-black  opacity-70'>Begin your wellness journey. Sign up for comprehensive health support and embrace a healthier life</p>
        </div>

        <div>
          <form onSubmit={submitHandler}>

            <div className="flex flex-col sm:flex-row items-center justify-center">
              <div className="sm:w-1/2 sm:max-w-fit  ">
                <div className=' flex items-start  font-semibold opacity-65'>
                  <label htmlFor="">Name</label>
                </div>
                <div className='flex items-start pl-3 mt-1'>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-gray-500 border-2 rounded"
                    placeholder='name' style={{ paddingLeft: '10px' }} />
                </div>
              </div>
              <div className="sm:w-1/2  max-w-fit ">
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

            <div className="flex flex-col sm:flex-row items-center justify-center">
              <div className="sm:w-1/2 sm:max-w-fit  ">
                <div className=' flex items-start font-semibold opacity-65'>
                  <label htmlFor="">Email</label>
                </div>
                <div className='flex items-start pl-3 mt-1'>
                  <input type="email"
                    className="w-full border-gray-500 border-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email' style={{ paddingLeft: '10px' }} />
                </div>
              </div>
              <div className="sm:w-1/2  max-w-fit ">
                <div className='flex items-start  font-semibold opacity-65'>
                  <label htmlFor="">Phone number</label>
                </div>
                <div className='flex items-start pl-3 mt-1'>
                  <input type="text"
                    className="w-full border-gray-500 border-2 rounded"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='phone' style={{ paddingLeft: '10px' }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center">
              <div className="sm:w-1/2 sm:max-w-fit  ">
                <div className=' flex items-start font-semibold opacity-65'>
                  <label htmlFor="">Password</label>
                </div>
                <div className='flex items-start pl-3 mt-1'>
                  <input type="password"
                    className="w-full border-gray-500 border-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password' style={{ paddingLeft: '10px' }} />
                </div>
              </div>
              <div className="sm:w-1/2  max-w-fit ">
                <div className='flex items-start font-semibold opacity-65 '>
                  <label htmlFor="">Confirm Password</label>
                </div>
                <div className='flex items-start pl-3 mt-1'>
                  <input type="password"
                    className="w-full border-gray-500 border-2 rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password' style={{ paddingLeft: '10px' }} />
                </div>
              </div>
            </div>

            {/* erorrr handling */}

            <div>
              {
                Error && (
                  <div className='text-red-500 font-medium'>
                    {Error}
                  </div>
                )
              }

            </div>

            <div className=' p-4 mt-3'>
              <button type="submit" className="text-white bg-[#2D6A76] rounded-md  px-6 sm:px-28 py-2 sm:py-2">
                Sign in
              </button>
            </div>
            
            <div className='text-sm font-semibold opacity-70 my-1'>
              Already have an account?<Link className='text-[#2D6A76] ps-1' to='/login'>Log in</Link>
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
    </>
  )
}

export default SignUp

