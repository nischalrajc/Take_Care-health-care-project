import React, { useEffect } from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Axios } from '../../Axios/users';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


function AppointmentScheduleModal({ doctorId, isOpen, onclose }) {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [availableSlots, setAvailableSlots] = useState([]);
    const [slotId, setSlotId] = useState('')

    const userInfo = useSelector((state) => state.user.user)
    const userId = userInfo?._id

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            try {
                await Axios.get(`/available_slots?doctorId=${doctorId}&date=${selectedDate}`).then((response) => {
                    if (response.data) {
                        setAvailableSlots(response.data.slots);
                    }
                }).catch((error) => {
                    console.log("error", error)
                })
            } catch (error) {
                console.error("Error fetching available slots:", error);
            }
        };

        fetchAvailableSlots();
    }, [doctorId, selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const selectHandler = async (id) => {
        setSlotId(id)
    }

    const submitHandler = async () => {
        try {
            await Axios.post('/checkout-session', { userId, doctorId, slotId }).then((response) => {
                if (response.data) {
                    window.location.href = response.data.session.url
                }
            }).catch((error) => {
                console.log("error", error)
            })
        } catch (Error) {
            console.log("error", Error)
        }
    }

    return (

        <div>
            {
                userInfo ? (
                    <div className={`modal ${isOpen ? 'is-active' : ''}`} >
                        <div className="modal-content   rounded-lg overflow-hidden p-12 max-w-3xl mx-auto text-start">
                            <section className="modal-body">
                                <div className="flex">
                                    <Calendar minDate={new Date()} onChange={handleDateChange} />

                                    {
                                        availableSlots?.length > 0 ? (
                                            <div className='ms-6'>
                                                {availableSlots?.map((slot, index) => {
                                                    const formattedTime = new Date(slot.date).toLocaleTimeString();
                                                    const Scheduled = slot.scheduled
                                                    const isSelected = slotId === slot._id;

                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={Scheduled ? null : () => selectHandler(slot._id)}
                                                            className={` border border-gray-400 my-2 px-6 py-1 rounded-md text-center ${isSelected ? 'bg-blue-500' : ''} ${Scheduled ? 'opacity-50 hover:cursor-not-allowed' : 'hover:cursor-pointer'}`}
                                                        >
                                                            {formattedTime}
                                                            {Scheduled && <p className="hover:cursor-not-allowed already-booked-text">Already booked</p>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="ms-6 w-36 flex items-center ">
                                                <p>No available slots at this time choose another date</p>
                                            </div>
                                        )
                                    }


                                </div>
                            </section>
                            <footer className="modal-footer border-t pt-4 mt-4 flex flex-col sm:flex-row sm:justify-between">
                                <button onClick={submitHandler} className="button block w-full bg-[#E38569] hover:bg-[#e07757] text-white font-semibold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">Submit</button>
                                <button className="authbtn block w-full" onClick={() => onclose(false)}>Cancel</button>
                            </footer>
                        </div>
                    </div>
                ) : (
                    <div className="modal-content bg-[#9CBCB7] font-inder rounded-lg overflow-hidden p-10 max-w-3xl mx-auto text-start">
                        Login to book an Appointment
                        <Link className='ms-2 underline text-blue-700' to='/login'>Click here</Link>
                        <div className='mt-2 text-center'>

                            <Link onClick={() => onclose(false)}>Cancel</Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AppointmentScheduleModal
