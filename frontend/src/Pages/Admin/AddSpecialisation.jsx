import React from 'react'
import { useState } from 'react'
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import { useRef } from 'react';
import axios from 'axios';
import { Axios } from '../../Axios/admin';
import FadeLoader from "react-spinners/FadeLoader"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function AddSpecialisation() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null)
    const [specialisation, setSpecialisation] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const PRESET_KEY = process.env.REACT_APP_PRESET_KEY
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
    const CLOUD_UPLOAD_URL = process.env.REACT_APP_CLOUD_UPLOAD_URL

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

    const submitHandler = async (e) => {
        e.preventDefault()

        setLoading(true)

        const formdata = new FormData()
        formdata.append('file', image)
        formdata.append('upload_preset', `${PRESET_KEY}`)
        formdata.append('cloud_name', `${CLOUD_NAME}`)

        const response = await axios.post(`${CLOUD_UPLOAD_URL}`, formdata)

        if (response.status === 200) {
            const image_url = response.data.secure_url

            await Axios.post('/add_specialisation', { specialisation, description, image_url }).then((response) => {
                setLoading(false)
                if (response) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Specialisation added",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/admin/specialisation')

                }
            }).catch((error) => {
                console.log("error", error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
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

export default AddSpecialisation
