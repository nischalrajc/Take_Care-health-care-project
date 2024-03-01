import React from 'react'
import { Axios } from '../../Axios/users'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import NavBAr from '../../Components/User/NavBAr'
import DoctorsCard from '../../Components/User/DoctorsCard'
import Specialities from '../../Components/User/Specialities'
import Footer from '../../Components/User/Footer'

function Home() {
  const [array, setArray] = useState(null)

  const navigate = useNavigate()

  const fetchData = async () => {
      await Axios.get('/listDoctors', { withCredentials: true }).then((response) => {
          if (response.data) {
              setArray(response.data.doctors)
          }
      }).catch((error) => {
          console.log("error", error)
      })
  }

  useEffect(() => {
      fetchData()
  }, [])

  return (
    <div>
      <NavBAr />

      <div className="grid grid-cols-2">
        <div className=' flex flex-col items-center justify-center'>
          <h1 className='sm:text-4xl text-xs  font-medium'>Explore the Future of <br /> Healthcare with <br /> Take Care.</h1>
          <div className='sm:p-4 sm:mt-3 mt-1 text-xs sm:text-sm'>
            <button className="text-white bg-[#2D6A76] rounded-md  px-4 sm:px-8 py-1 sm:py-2 ">
              TRY NOW
            </button>
          </div>
        </div>
        <div>
          <img className="" src="/takecarelandingpagepicture.jpg" alt="Icon" />
        </div>
      </div>

      <div className='py-5 sm:py-1 sm:text-base text-xs'>
        <p>"Your Journey to Wellness Starts Here - Discover the Magic of Take Care."</p>
      </div>

      <DoctorsCard array={array ? array.slice(0, 4) : []}/>

      <div className='my-6'>
        <button className='bg-[#E38569] text-white font-inder px-6 py-1 rounded-md' onClick={()=>navigate('/specialist')}>All Specialist</button>
      </div>

      <div className='my-6 mx-2 sm:mx-10 sm:text-base'>
        <p>At Take Care, our mission is to provide accessible, personalized, and high-quality healthcare through an innovative online platform. We aim to connect individuals with experienced healthcare professionals on Take Care, fostering a collaborative environment that empowers users to proactively manage their health. By leveraging technology, we strive to break down geographical barriers and enhance the overall healthcare experience, ensuring everyone has convenient and timely access to expert medical advice, promoting a healthier and happier global community.</p>
      </div>

      <div className='bg-[#DFEBE9] py-10 px-0 sm:px-10 mt-10'>
        <div className=" lg:text-4xl py-2">
          Let’s get you a doc who gets you
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 mt-2 px-0 lg:px-20">
          <div className="">
            <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-60 lg:w-60 mx-auto">
              <img className='w-full h-full object-cover' src='./male-doctor-listening-to-teenage-boy-lungs-clipart-23600.jpg' alt='img'></img>
            </div>
            <div className="text-xs sm:text-base my-2">Lets find the specialised ones</div>
            <button className='bg-white border border-black px-3 py-1' onClick={()=>navigate('/findone')}>Find Out</button>
          </div>
          <div className="">
            <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-60 lg:w-60  mx-auto">
              <img className='w-full h-full object-cover' src='./Patient_survey_large.png' alt='img'></img>
            </div>
            <div className="text-xs sm:text-base my-2">Popular Health Checkup</div>
            <button className='bg-white border border-black px-3 py-1'>See Providers</button>
          </div>
          <div className="mt-4 sm:mt-0 col-span-full sm:col-auto sm:mx-auto">
            <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-60 lg:w-60  mx-auto">
              <img className='object-cover  w-full h-full' src='./f7300384ce50b6556f6f79af60206c87.jpg' alt='img'></img>
            </div>
            <div className="text-xs sm:text-base my-2">Book an appointment today, online</div>
            <button className='bg-white border border-black px-1 sm:px-3 py-1'>Check availability</button>
          </div>
        </div>
      </div>

      <div className='my-10 text-xl'>
        <p>Our Specialities</p>
      </div>

      <Specialities />

      <div className='bg-[#DFEBE9] mt-5 sm:mt-24 py-2 sm:py-6'>
        <div className="sm:text-4xl mt-3">Testimonials</div>
        <div className=" mt-3 sm:mt-6 grid sm:grid-cols-3 grid-cols-2 justify-center xl:mx-60  lg:mx-48 md:mx-16 sm:mx-2 text-white">
          <div className="bg-[#6E4975] rounded-md mx-1 py-1 my-1 sm:my-0">
            <div className='text-xs sm:text-lg'>
              Amith Anandh
            </div>
            <div className="text-xs sm:text-base sm:my-8">“I had an awesome consultation with the doctor. It's absolutely more than just an app. Your all need to experience this.”</div>
          </div>
          <div className="bg-[#6E4975] rounded-md mx-1 py-1 my-1 sm:my-0">
            <div className='text-xs sm:text-lg'>
              Sanjay Dhath
            </div>
            <div className="text-xs sm:text-base sm:my-8">“I'm really very happy to get such an opportunity to consult with world reputed doctors from home. I'm much better now than before.”</div>
          </div>
          <div className="bg-[#6E4975] rounded-md  mx-16 sm:mx-1 py-1 my-1 sm:my-0 sm:col-auto col-span-2">
            <div className='text-xs sm:text-lg'>
              Vajeeha
            </div>
            <div className="text-xs sm:text-base sm:my-8">“SeekMed is a very useful app for consulting best doctors. I've consulted with one of the best orthopedic doctors of India and it's helped me get the best treatment sitting at home.”</div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="my-10 text-xl font-medium">
        How it works
        </div>
        <div className="grid grid-cols-3 border-b-2 py-4 mx-24">
          <div className="div">1.Choose doctor specialisation</div>
          <div className="div">2. Select doctors availability</div>
          <div className="div">3. Schedule Appointment</div>
        </div>
      </div>

      <Footer/>

    </div>
  )
}

export default Home