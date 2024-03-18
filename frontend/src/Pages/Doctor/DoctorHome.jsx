import React from 'react'
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor'
import Header from '../../Components/Doctor/Header'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import FadeLoader from "react-spinners/FadeLoader"
import { useSelector, useDispatch } from 'react-redux';
import { doctorLogin } from '../../Slices/doctorSlice';
import axios from 'axios';
import { Axios } from '../../Axios/doctor';
import Swal from 'sweetalert2';

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
  const dispatch = useDispatch()

  const PRESET_KEY = process.env.REACT_APP_PRESET_KEY
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
  const CLOUD_UPLOAD_URL = process.env.REACT_APP_CLOUD_UPLOAD_URL

  const doctorInfo = useSelector((state) => state.doctor.doctor)
  useEffect(() => {
    setName(doctorInfo?.name || '');
    setBio(doctorInfo?.bio || '');
    setEmail(doctorInfo?.email || '');
    setGender(doctorInfo?.gender || '');
    setPhone(doctorInfo?.phoneNumber || '');
    setSpecialisation(doctorInfo?.specialisation || '');
    setFees(doctorInfo?.fees || '');
    setDescription(doctorInfo?.description || '');
  }, [doctorInfo]);

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
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setImage(file)

  };

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

    if (!validateFees(fees)) {
      setError('Fee must be a number')
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    setLoading(true)

    let image_url = doctorInfo?.image;
    const doctorId = doctorInfo?._id

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

    Axios.put('/updateProfile', { name, email, bio, gender, phone, specialisation, fees, description, image_url, doctorId }).then((response) => {
      if (response.data) {
        Swal.fire({
          text: "Profile updated successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        })
        dispatch(doctorLogin({ ...response.data }))
      }
    }).catch((error) => {
      console.log("error", error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        timer: 1500,
        showConfirmButton: false
      });
    })
    setLoading(false)

  }

  return (
    <div>
      <NavbarDoctor />
      <Header title='profile' />

      {/* <div className='w-full px-8'>
        <form onSubmit={submitHandler}>

          <div className='flex justify-center  w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto my-5 '>
            <img className="w-40 h-36 object-cover rounded-full cursor-pointer" src={selectedImage || doctorInfo?.image || "/profilepic.jpg"} alt="Icon" onClick={handleImageClick} />
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

      </div> */}

      <form onSubmit={submitHandler}>
        <div className="flex flex-col md:flex-row  py-10  mx-0 md:mx-8 xl:mx-20">
          <div className="lg:w-2/5 md:w-2/4">
            <div className='rounded-md border border-black mx-auto md:h-96 md:w-auto sm:h-72 sm:w-72' style={{ overflow: 'hidden' }} >
              <img className="w-full h-full object-cover cursor-pointer" src={selectedImage || doctorInfo?.image || "/profilepic.jpg"} alt="Icon" onClick={handleImageClick} />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className='-300 w-full'>
            <div className='flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-5 '>
              <div className='font-semibold  opacity-65 mr-4'>
                Name
              </div>
              <div className='w-3/4  md:w-72 '>
                <input type="text"
                  className=" border-gray-500 border-2 w-full rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='name' style={{ paddingLeft: '10px' }} required />
              </div>
            </div>

            <div className=' flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-5 '>
              <div className='font-semibold opacity-65 mr-4'>
                Bio
              </div>
              <div className='w-3/4  md:w-72 '>
                <input type="text"
                  className=" border-gray-500 border-2 w-full rounded"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder='bio' style={{ paddingLeft: '10px' }} required />
              </div>
            </div>

            <div className=' flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-5 '>
              <div className='font-semibold opacity-65 mr-4'>
                Email
              </div>
              <div className='w-3/4  md:w-72 '>
                <input type="email"
                  className=" border-gray-500 border-2 w-full rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='email' style={{ paddingLeft: '10px' }} required />
              </div>
            </div>

            <div className='flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-5 '>
              <div className='font-semibold opacity-65 mr-1'>
                Gender
              </div>
              <div className='w-3/4  md:w-72 '>
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

            <div className='flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-5 '>
              <div className='font-inder opacity-70 mr-4'>
                Phone
              </div>
              <div className='w-3/4  md:w-72 '>
                <input type="text"
                  className=" border-gray-500 border-2 w-full rounded"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Phone' style={{ paddingLeft: '10px' }} required />
              </div>
            </div>

            <div className=' flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-5 '>
              <div className='font-inder opacity-70 mr-4'>
                Specialisation
              </div>
              <div className='w-3/4  md:w-72 '>
                <input type="text"
                  className=" border-gray-500 border-2 w-full rounded"
                  value={specialisation}
                  onChange={(e) => setSpecialisation(e.target.value)}
                  placeholder='specialisation' style={{ paddingLeft: '10px' }} required />
              </div>
            </div>

            <div className=' flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-5 '>
              <div className='font-inder opacity-70 mr-4'>
                Fees
              </div>
              <div className='w-3/4  md:w-72 '>
                <input type="text"
                  className=" border-gray-500 border-2 w-full rounded"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  placeholder='fees' style={{ paddingLeft: '10px' }} required />
              </div>
            </div>

            <div className='flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-5 '>
              <div className='font-inder opacity-70 mr-4'>
                Description
              </div>
              <div className='w-3/4  md:w-72 '>
                <textarea type="text"
                  className=" border-gray-500 border-2 w-full rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='description' style={{ paddingLeft: '10px' }} required />
              </div>
            </div>

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
          </div>
        </div>
      </form>

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
  )
}

export default DoctorHome
