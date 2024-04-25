import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import { useRef } from 'react';
import axios from 'axios';
import { Axios } from '../../Axios/admin';
import FadeLoader from "react-spinners/FadeLoader"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function AddDoctors() {

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [specialisation, setSpecialisation] = useState('')
    const [fees, setFees] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [array, setArray] = useState([])


    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const PRESET_KEY = process.env.REACT_APP_PRESET_KEY
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
    const CLOUD_UPLOAD_URL = process.env.REACT_APP_CLOUD_UPLOAD_URL

    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    const validateFees = (fees) => {
        return /^\d+$/.test(fees) || fees === '';
    }


    const handleImageClick = () => {
        // Trigger the click event of the hidden file input
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Set the selected image state
        setSelectedImage(URL.createObjectURL(file));
        setImage(file)

    };

    useEffect(() => {
        Axios.get('/specialisations').then((response) => {
            if (response.data) {
                setArray(response.data)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault()

        const trimmedName = name.trim();
        const trimmedDescription = description.trim();

        if (!trimmedName) {
            setError('Name cannot be empty');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

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

        if (!validateFees(fees)) {
            setError('Fee must be a number')
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        if (!trimmedDescription) {
            setError('description cannot be empty');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        setLoading(true)

        const formdata = new FormData()
        formdata.append('file', image)
        formdata.append('upload_preset', `${PRESET_KEY}`)
        formdata.append('cloud_name', `${CLOUD_NAME}`)

        const response = await axios.post(`${CLOUD_UPLOAD_URL}`, formdata)

        if (response.status === 200) {
            const image_url = response.data.secure_url

            await Axios.post('/add_doctors', { name, email, bio, phone, gender, specialisation, fees, description, image_url }).then((response) => {
                setLoading(false)
                if (response) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Doctor added Succesfully!",
                        icon: "success"
                    });

                    navigate('/admin/doctors')

                }
            }).catch((error) => {
                console.log("error", error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Doctor already exist!",
                });
                setLoading(false)
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            <div className=' flex flex-row'>

                <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
                <div className='w-full px-8 mt-8'>

                    <form onSubmit={submitHandler}>

                        <div className='flex justify-center  w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 '>
                            <img className="w-40 h-36 object-cover rounded-full cursor-pointer" src={selectedImage || "/profilepic.jpg"} alt="Icon" onClick={handleImageClick} />
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>

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
                                Bio
                            </div>
                            <div className='w-full md:w-72'>
                                <input type="text"
                                    className=" border-gray-500 border-2 w-full rounded"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder='bio' style={{ paddingLeft: '10px' }} required />
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

                        <div className=' w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
                            <div className='font-inder opacity-70 mr-4'>
                                Specialisation
                            </div>
                            <div className='w-full md:w-72'>
                                <select
                                    value={specialisation}
                                    onChange={(e) => setSpecialisation(e.target.value)}
                                    className="w-full  border-gray-500 border-2 rounded"
                                    required>
                                    <option value="" disabled>Choose One</option>
                                    {
                                        array?.map((item, index) => (
                                            <option className='text-xs' key={index} value={item.specialisation}>{item.specialisation}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className=' w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
                            <div className='font-inder opacity-70 mr-4'>
                                Fees
                            </div>
                            <div className=' w-full md:w-72'>
                                <input type="text"
                                    className=" border-gray-500 border-2 w-full rounded"
                                    value={fees}
                                    onChange={(e) => setFees(e.target.value)}
                                    placeholder='fees' style={{ paddingLeft: '10px' }} required />
                            </div>
                        </div>

                        <div className=' w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 flex justify-between'>
                            <div className='font-inder opacity-70 mr-4'>
                                Description
                            </div>
                            <div className='w-full md:w-72'>
                                <textarea type="text"
                                    className=" border-gray-500 border-2 w-full rounded"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='description' style={{ paddingLeft: '10px' }} required />
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
                                Add
                            </button>
                        </div>
                    </form>

                    {/* Loader */}
                    {loading && (
                        <div className="fixed top-0 left-0 w-full min-h-dvh flex items-center justify-center ">
                            <FadeLoader
                                color={'#2D6A76'}
                                className=''
                                loading={loading}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default AddDoctors
