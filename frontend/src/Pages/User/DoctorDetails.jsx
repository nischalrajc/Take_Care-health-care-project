import React, { useState } from 'react'
import NavBar from '../../Components/User/NavBAr'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Axios } from '../../Axios/users'
import Footer from '../../Components/User/Footer'
import AppointmentScheduleModal from '../../Components/User/AppointmentScheduleModal'

function DoctorDetails() {
    const { id } = useParams()

    const [doctor, setDoctor] = useState('')
    const [showModal,setShowModal] = useState(false)

    useEffect(() => {
        Axios.get(`/doctorDetails/${id}`, { withCredentials: true }).then((response) => {
            if (response.data) {
                console.log(response.data)
                setDoctor(response.data)
            }
        }).catch((error) => {
            console.log("error", error)
        }).finally(() => {
            window.scrollTo(0, 0);
        });
    }, [id])

    const handleShowModal = ()=>{
        setShowModal(true)
    }

    console.log(doctor)


    return (
        <div>
            <NavBar />

            <div className="lg:flex lg:mx-20 md:mt-16 mt-10">
                <div className="lg:w-1/4 w-2/4 mx-auto">
                    <div className='border rounded-md border-black mx-2 sm:h-96 h-48' style={{ overflow: 'hidden' }} >
                        <img className="w-full h-full object-cover" src={doctor?.image} alt="doctors" />
                    </div>
                </div>
                <div className=" lg:w-3/4 flex flex-col justify-center lg:ms-8 mt-2 lg:mt-0 px-10 rounded-md">
                    <div className=" font-inder my-1 text-start">Dr. {doctor?.name}</div>
                    <div className="font-inder text-xs md:text-sm my-1 text-start">{doctor?.bio}</div>
                    <div className=" my-6 text-start"><button className='bg-[#E38569] hover:bg-[#e07757] px-10 py-1 rounded-md text-white ' onClick={handleShowModal}>Schedule Appointment</button></div>
                    <div className=" my-1 text-start font-inter text-xs md:text-sm">{doctor?.description}</div>
                </div>
            </div>

            {showModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center">
      <div className="border border-black border-opacity-25 rounded-lg shadow-lg transition delay-700 duration-300 bg-white">
          <AppointmentScheduleModal doctorId={doctor._id} isOpen={showModal} onclose={setShowModal}/>
        </div>
        </div>}

            <Footer/>
        </div>
    )
}

export default DoctorDetails
