import React from 'react'
import { useState } from 'react'
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import { useRef } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function AddDoctors() {

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image,setImage] = useState(null)
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [specialisation, setSpecialisation] = useState('')
    const [fees, setFees] = useState('')
    const [description, setDescription] = useState('')

    const fileInputRef = useRef(null);

    // const PRESET_KEY = process.env.REACT_APP_PRESET_KEY
    // console.log(PRESET_KEY,"wwwwwwwwwwww")


    const handleImageClick = () => {
        // Trigger the click event of the hidden file input
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        // Handle the selected file as needed
        const file = e.target.files[0];

        // Set the selected image state
        setSelectedImage(URL.createObjectURL(file));
        setImage(file)

        // Do something with the file (e.g., upload or process)
        console.log('Selected file:', file);
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("hhhhhhhhhhhhhhhhhhhhh")

        const formdata = new FormData()
        formdata.append('file',image)
        formdata.append('upload_preset','l6cbh0jc')
        formdata.append('cloud_name','dt5npa24l')


       const response = await axios.post('https://api.cloudinary.com/v1_1/dt5npa24l/upload',formdata)
       console.log(response)

    }

    // const navigate = useNavigate()

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
                            <img className="w-40 h-36 object-cover rounded-full cursor-pointer" src={selectedImage || "/profilepic.jpg"} alt="Icon"  onClick={handleImageClick}/>
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
                                <input type="text"
                                    className=" border-gray-500 border-2 w-full rounded"
                                    value={specialisation}
                                    onChange={(e) => setSpecialisation(e.target.value)}
                                    placeholder='specialisation' style={{ paddingLeft: '10px' }} required />
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
                        <div className=' p-4 mt-3'>
                            <button type="submit" className=" bg-[#E38569] text-white rounded-md  px-6 sm:px-14 py-2 sm:py-2">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDoctors
