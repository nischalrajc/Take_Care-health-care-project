import React, { useEffect } from 'react'
import LoginNav from '../../Components/User/LoginNav'
import { useState } from 'react'
import { Axios } from '../../Axios/doctor'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import OTP from '../../Components/Doctor/OTP'


function DoctorRegistration() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [specialisation, setSpecialisation] = useState(null)
    const [speciality, setSpeciality] = useState('')
    const [certificate, setCertificate] = useState('')
    const [bio, setBio] = useState('')
    const [error, setError] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)

    const formData = new FormData();
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('phone', phone)
    formData.append('gender', gender)
    formData.append('speciality', speciality)
    formData.append('bio', bio)
    formData.append('certificate', certificate)

    useEffect(() => {
        Axios.get('/getspecialisation').then((response) => {
            if (response) {
                setSpecialisation(response.data)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }, [])

    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Invalid email format');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        if (!validatePhone(phone)) {
            setError('Invalid phone number format');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 8 characters long');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }

        if (password !== confirmPassword) {
            setError('Password and confirm password do not match');
            setTimeout(() => {
                setError('');
            }, 2000);
            return
        }

        setLoading(true)

        await Axios.get(`/mailvalidation/${email}`).then((response) => {
            setLoading(false);
            if (response.data) {
                setOtp(response.data.verificationOTP)
            }
        }).catch((error) => {
            setLoading(false)
            console.log("error", error)
        })

    };

    return (

        <div>
            <LoginNav />

            <div className='font-semibold mt-5 sm:text-4xl text-2xl'>
                Register into your account
            </div>
            <div className='font-semibold mt-3 max-w-sm mx-auto sm:text-sm text-center px-2 sm:px-0'>
                <p className='text-black  opacity-70'>Complete this form to join our team. Share your qualifications, and we'll review your application promptly. </p>
            </div>

            <div style={{ position: 'relative' }}>
                {
                    otp ? (
                        <OTP formData={formData} mailOTP={otp} />
                    ) : (
                        <div>
                            <form onSubmit={submitHandler} encType="multipart/form-data">

                                <div className="flex flex-col sm:flex-row items-center mt-5 mb-2 justify-center">
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
                                                placeholder='name' style={{ paddingLeft: '10px' }} required />
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
                                                required>
                                                <option value="" disabled>Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center  justify-center mb-2">
                                    <div className="sm:w-1/2 sm:max-w-fit  ">
                                        <div className=' flex items-start font-semibold opacity-65'>
                                            <label htmlFor="">Email</label>
                                        </div>
                                        <div className='flex items-start pl-3 mt-1'>
                                            <input type="email"
                                                className="w-full border-gray-500 border-2 rounded"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='email' style={{ paddingLeft: '10px' }} required />
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

                                <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
                                    <div className="sm:w-1/2 sm:max-w-fit">
                                        <div className=' flex items-start font-semibold opacity-65'>
                                            <label htmlFor="">Specialisation</label>
                                        </div>
                                        <div className='flex items-start pl-3 mt-1'>
                                            <select
                                                value={speciality}
                                                onChange={(e) => setSpeciality(e.target.value)}
                                                className="w-full  border-gray-500 border-2 rounded"
                                                required>
                                                <option value="" disabled>Choose One</option>
                                                {
                                                    specialisation?.map((item, index) => (
                                                        <option className='text-xs' key={index} value={item.specialisation}>{item.specialisation}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:w-1/2  max-w-fit ">
                                        <div className='flex items-start  font-semibold opacity-65'>
                                            <label htmlFor="">Bio</label>
                                        </div>
                                        <div className='flex items-start pl-3 mt-1'>
                                            <input type="text"
                                                className="w-full border-gray-500 border-2 rounded"
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                placeholder='bio' style={{ paddingLeft: '10px' }} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
                                    <div className="sm:w-1/2 sm:max-w-fit  ">
                                        <div className=' flex items-start font-semibold opacity-65'>
                                            <label htmlFor="">Password</label>
                                        </div>
                                        <div className='flex items-start pl-3 mt-1'>
                                            <input type="password"
                                                className="w-full border-gray-500 border-2 rounded"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder='Password' style={{ paddingLeft: '10px' }} required />
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
                                                placeholder='Confirm Password' style={{ paddingLeft: '10px' }} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center ">
                                    <div className="sm:w-1/2 sm:max-w-fit">
                                        <div className=' flex items-start font-semibold opacity-65'>
                                            <label htmlFor="">Registration Certificate</label>
                                        </div>
                                        <div className='flex items-start pl-3 mt-1'>
                                            <input type="file"
                                                className="w-full border-gray-500 border-2 rounded p-1 hover:cursor-pointer"
                                                onChange={(e) => setCertificate(e.target.files[0])}
                                                required />
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

                                <div className='text-sm font-semibold opacity-70 my-1'>
                                    Already have an account?<Link className='text-[#2D6A76] ps-1' to='/doctor_login'>Log in</Link>
                                </div>
                            </form>
                        </div>
                    )
                }

                {loading && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <ClipLoader color="#2D6A76" />
                    </div>
                )}
            </div>
        </div>

    )
}

export default DoctorRegistration
