import React, { useContext ,useState, useEffect} from 'react'
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor'
import Header from '../../Components/Doctor/Header'
import { Axios } from '../../Axios/doctor'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SocketContext } from '../../Context/socketContext';


function AppointmentsScheduled() {
  const { newUser } = useContext(SocketContext)

  const [appointments, setAppointments] = useState([])
  const doctorInfo = useSelector((state) => state.doctor.doctor)

  const id = doctorInfo?._id

  const navigate = useNavigate()

  useEffect(() => {

    Axios.get(`/scheduled_appointment/${id}`).then((response) => {
      if (response.data) {
        setAppointments(response.data.appointments)
      }
    }).catch((error) => {
      console.log(error)
    })

  }, [id])

  useEffect(() => {
    newUser(id)
  }, [])

  const handlescheduleMeeting = (userId, appointmentId) => {
    navigate(`/room/${userId}/${appointmentId}`)
  }


  return (
    <div>
      <NavbarDoctor />
      <Header title='appointments' />

      {
        appointments.length > 0 ? (
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
                  <button className='hover:bg-[#9CBCB7] px-8 rounded-md py-1 border text-white border-white' onClick={() => handlescheduleMeeting(appointment.user._id, appointment._id)}>Schedule</button>
                </div>
              </div>
            </>
          ))
        ) : (
          <>
            <div className="text-center text-gray-500 font-medium mt-10" >
              You don't have any meetings scheduled.
            </div>
            <div className="div">
              <Link to='/doctors_slots'> <button className='bg-[#CED891] px-6 rounded-md mt-4 font-inder py-1'> Add Slot</button></Link>
            </div>
            <div className="h-96 mt-6">
              <img src="/7709344_3724894.jpg" className="w-full h-full object-contain" alt="No Appointments Available" />
            </div>
          </>
        )
      }
    </div>
  )
}

export default AppointmentsScheduled
