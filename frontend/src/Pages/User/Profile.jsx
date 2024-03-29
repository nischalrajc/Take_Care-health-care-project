import React, { useState, useEffect } from 'react'
import ProfileBar from '../../Components/User/ProfileBar'
import ProfileHeader from '../../Components/User/ProfileHeader'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../Slices/userSlice'
import { Axios } from '../../Axios/users'
import Swal from 'sweetalert2'

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

        Axios.put('/editProfile', { name, email, gender, phone, id }, { withCredentials: true }).then((response) => {
            if (response.data) {
                console.log(response.data)
                Swal.fire({
                    // title: "Good job!",
                    text: "Profile Updated",
                    icon: "success"
                });
                dispatch(userLogin({ ...response.data }))
            }
        }).catch((error) => {
            console.log("error", error)
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

            <div className='w-full px-8 mt-20'>

                <form onSubmit={submitHandler}>

                    {/* <div className='flex justify-center  w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 '>
            <img className="w-40 h-36 object-cover rounded-full cursor-pointer" src={selectedImage || doctorInfo?.image || "/profilepic.jpg"} alt="Icon" onClick={handleImageClick} />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div> */}

                    <div className='flex justify-between w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 '>
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

                    <div className=' w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
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

                    <div className=' w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
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

                    <div className=' w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
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

                    <div className=' p-4 mt-3'>
                        <button type="submit" className=" bg-[#E38569] text-white rounded-md  px-6 sm:px-14 py-2 sm:py-2">
                            Save Changes
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Profile
