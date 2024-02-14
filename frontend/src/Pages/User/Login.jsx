import React, { useEffect } from 'react'
import LoginNav from '../../Components/User/LoginNav'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../../Axios/users'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../Slices/userSlice'



function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.user.user)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    })

    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(email);
    };


    const submitHandler = (e) => {
        e.preventDefault()

        if (!email || !password) {
            setError('All fields are required');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        // Email validation
        if (!validateEmail(email)) {
            setError('Invalid email format');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        Axios.post('/login', { email, password }, { withCredentials: true }).then((response) => {
            if (response.data) {
                dispatch(userLogin({ ...response.data }))
                navigate('/')
            } else {
                setError("Incorrect email and password")
                setTimeout(() => {
                    setError('')
                }, 2000)
            }
        }).catch((error) => {
            console.log(error)
        })

    }

    return (
        <div>
            <LoginNav />
            <div className='font-semibold mt-5 sm:text-4xl text-2xl'>
                Log in to your account
            </div>
            <div className='font-semibold mt-3 max-w-sm mx-auto sm:text-sm text-center px-2 sm:px-0'>
                <p className='text-black  opacity-70'>Start your online doctor visit by logging in. Your path to better health begins here.</p>
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
                                placeholder='email' style={{ paddingLeft: '10px' }} />
                        </div>
                    </div>

                    <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto ">
                        <div className='flex font-medium opacity-60 mt-4'>
                            <label htmlFor="">Password</label>
                        </div>
                        <div className='flex items-start mt-1'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-gray-500 border-2 rounded"
                                placeholder='password' style={{ paddingLeft: '10px' }} />
                        </div>
                    </div>

                    <div className=' w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5   mx-auto flex items-start font-inter text-sm font-mediumbold text-[#2D6A76] mt-4'>
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

                <div className='text-sm font-semibold opacity-70 my-2'>
                    Don't have an account?<Link className='text-[#2D6A76] ps-1' to='/signup'>Sign up</Link>
                </div>
                <div className='text-sm font-semibold opacity-70'>
                    Take Care Provider?<Link className='text-[#2D6A76] ps-1' to='/doctor_login'>Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
