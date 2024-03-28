import React from 'react'
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor'
import Header from '../../Components/Doctor/Header'
import { useState, useEffect } from 'react'
import { Axios } from '../../Axios/doctor'
import { useSelector } from 'react-redux'

function AppointmentsScheduled() {

  const [appointments, setAppointments] = useState([])
  const doctorInfo = useSelector((state) => state.doctor.doctor)

  const id = doctorInfo?._id

  useEffect(() => {
    Axios.get(`/scheduled_appointment/${id}`).then((response) => {
      if (response.data) {
        setAppointments(response.data.appointments)
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [id])

  return (
    <div>
      <NavbarDoctor />
      <Header title='appointments' />
      {
        appointments.map((appointment, index) => (
          <>
            <div key={index} className="bg-[#2D6A76] text-gray-300 flex justify-center mt-8 w-1/3 mx-auto py-5 rounded-lg font-inder">
              <div className="mx-5 ">
                <div className="">
                  {new Date(appointment.date).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    // weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="">
                  {new Date(appointment.date).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    hour: 'numeric',
                    minute: 'numeric',
                    // second: 'numeric',
                  })}
                </div>
              </div>
              <div className="mx-5 flex  items-center">
                <div className="">{appointment.user.name}</div>
                <div className="">{appointment.doctor.specialisation}</div>

              </div>
              <div className=" mx-5 flex  items-center">
                <button className='hover:bg-[#9CBCB7] px-8 rounded-md py-1 border text-white border-white'>Join</button>
              </div>
            </div>
          </>
        ))
      }
    </div>
  )
}

export default AppointmentsScheduled
