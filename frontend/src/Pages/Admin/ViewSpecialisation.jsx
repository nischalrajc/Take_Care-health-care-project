import React, { useEffect, useState, useRef } from 'react'
import Header from '../../Components/Admin/Header'
import Sidebar from '../../Components/Admin/Sidebar'
import { Axios } from '../../Axios/admin';
import { useParams } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader"
import axios from 'axios';
import Swal from 'sweetalert2'

function ViewSpecialisation() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [specialisation, setSpecialisation] = useState([])
    const [name, setName] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null);

    const PRESET_KEY = process.env.REACT_APP_PRESET_KEY
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
    const CLOUD_UPLOAD_URL = process.env.REACT_APP_CLOUD_UPLOAD_URL

    const { id } = useParams()

    useEffect(() => {
        Axios.get(`/viewSpecialisation/${id}`).then((response) => {
            if (response.data) {
                setName(response.data?.specialisation || '');
                setDescription(response.data?.description || '')
            }
            setSpecialisation(response.data)
        }).catch((error) => {
            console.log("error", error)
        })
    }, [id])

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setImage(file)

    };

    const submitHandler = async (e) => {
        e.preventDefault()

        let image_url = specialisation?.image;

        setLoading(true)

        if (selectedImage) {
            const formdata = new FormData()
            formdata.append('file', image)
            formdata.append('upload_preset', `${PRESET_KEY}`)
            formdata.append('cloud_name', `${CLOUD_NAME}`)

            const response = await axios.post(`${CLOUD_UPLOAD_URL}`, formdata)
            if (response.status === 200) {
                image_url = response.data.secure_url
            }
        }

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.put('/updateSpecialisation/', { name, description, id, image_url }).then((response) => {
                    if (response.data) {
                        Swal.fire("Saved!", "", "success");
                    }
                }).catch((error) => {
                    console.log("error", error)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                })
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

        setLoading(false)

    }

    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            <div className=' flex flex-row'>
                <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
                <div className='w-full px-8 mt-8'>

                    <form onSubmit={submitHandler}>
                        <div className='flex justify-center  w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 '>
                            <img className="w-40 h-36 object-cover rounded-full cursor-pointer" src={selectedImage || specialisation.image || "/profilepic.jpg"} alt="Icon" onClick={handleImageClick} />
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
                                    value={name}
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
                                Update
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

export default ViewSpecialisation
