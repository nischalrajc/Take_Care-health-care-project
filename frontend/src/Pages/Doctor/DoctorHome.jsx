import React, { useEffect } from 'react'
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor'
import Header from '../../Components/Doctor/Header'
import { useState } from 'react';
import { useRef } from 'react';
import FadeLoader from "react-spinners/FadeLoader"
import { UseSelector, useSelector } from 'react-redux';

function DoctorHome() {

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

  const fileInputRef = useRef(null);

  const doctorInfo = useSelector((state)=>state.doctor.doctor)
  console.log(doctorInfo)

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setImage(file)

};

  const submitHandler = async(e) =>{
    console.log("h")
  }

  return (
    <div>
      <NavbarDoctor />
      <Header />

      <div className='w-full px-8 sm:mt-36 mt-48'>

        <form onSubmit={submitHandler}>

          <div className='flex justify-center  w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 '>
            <img className="w-40 h-36 object-cover rounded-full cursor-pointer" src={selectedImage || doctorInfo.image || "/profilepic.jpg"} alt="Icon" onClick={handleImageClick} />
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
                value={doctorInfo.name}
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
                value={doctorInfo.bio}
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
                value={doctorInfo.email}
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
                value={doctorInfo.gender}
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
                value={doctorInfo.phoneNumber}
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
                value={doctorInfo.specialisation}
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
                value={doctorInfo.fees}
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
                value={doctorInfo.description}
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
  )
}

export default DoctorHome
