import React, { useState, useEffect } from 'react'
import ProfileBar from '../../Components/User/ProfileBar'
import ProfileHeader from '../../Components/User/ProfileHeader'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../Slices/userSlice'
import { Axios } from '../../Axios/users'
import Swal from 'sweetalert2'
import Footer from '../../Components/User/Footer'

function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [id, setUserId] = useState('')

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.user.user)

    useEffect(() => {
        setName(userInfo?.name || '');
        setEmail(userInfo?.email || '');
        setGender(userInfo?.gender || '');
        setPhone(userInfo?.phoneNumber || '');
        setUserId(userInfo?._id || '')
    }, [userInfo]);

    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    const submitHandler = async (e) => {
        e.preventDefault()

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

        Axios.put('/editProfile', { name, email, gender, phone, id }).then((response) => {
            if (response.data) {
                Swal.fire({
                    text: "Profile Updated",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                dispatch(userLogin({ ...response.data }))
            }
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        })


    }


    return (
        <div>
            <ProfileBar />
            <ProfileHeader title='profile' />

            <div className="bg-cover mt-6 py-6 mx-0 lg:mx-60 " style={{ backgroundImage: 'url(/11235809_11003.jpg)' }}>
                <div className='flex justify-center  w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto'>
                    <img className="w-auto h-36 object-fill rounded-full " src="/profilepic.jpg" alt="Icon" />
                </div>

                <div className='w-full px-8'>

                    <form onSubmit={submitHandler}>

                        <div className='flex justify-between w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 '>
                            <div className='font-semibold  opacity-65 mr-4'>
                                Name
                            </div>
                            <div className='w-full md:w-72'>
                                <input type="text"
                                    className=" border-gray-500 border-2 w-full rounded"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='name' style={{ paddingLeft: '10px' }} required />
                            </div>
                        </div>

                        <div className=' w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
                            <div className='font-semibold opacity-65 mr-4'>
                                Email
                            </div>
                            <div className=' w-full md:w-72'>
                                <input type="email"
                                    className=" border-gray-500 border-2 w-full rounded"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='email' style={{ paddingLeft: '10px' }} required />
                            </div>
                        </div>

                        <div className=' w-full sm:w-1/2  lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
                            <div className='font-semibold opacity-65 mr-1'>
                                Gender
                            </div>
                            <div className='  w-full md:w-72'>
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

                        <div className=' w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
                            <div className='font-inder opacity-70 mr-4'>
                                Phone
                            </div>
                            <div className=' w-full md:w-72'>
                                <input type="text"
                                    className=" border-gray-500 border-2 w-full rounded"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder='Phone' style={{ paddingLeft: '10px' }} required />
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

                        <div className='p-4 mt-3 flex justify-center'>
                            <button type="submit" className=" bg-[#70a39c] hover:border border-gray-600  text-white rounded-md  px-6 sm:px-14 py-2 sm:py-2">
                                Save Changes
                            </button>
                        </div>
                    </form>

                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Profile
