import React from 'react'
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor'
import Header from '../../Components/Doctor/Header'
import { Axios } from '../../Axios/doctor';
import { useSelector } from 'react-redux';


function Slots() {
    const [slots, setSlots] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [updateUI, setUpdateUI] = useState(false)

    const doctorInfo = useSelector((state) => state.doctor.doctor)
    const doctorId = doctorInfo._id

    useEffect(() => {
        Axios.get(`/getSlots/${doctorId}`).then((response) => {
            if (response.data) {
                setSlots(response.data.slot)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }, [doctorId, updateUI])

    const handleAddSlot = async () => {
        Axios.post('/add_slot', { selectedDate, doctorId }).then((response) => {
            if (response.data) {
                setUpdateUI(prev => !prev)
            }
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    return (
        <div>
            <NavbarDoctor />
            <Header title='slots' />

            <div className='mt-6  flex justify-center'>
                <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    selected={selectedDate}
                    minDate={new Date()}
                    showTimeSelect
                    onChange={(date) => setSelectedDate(date)}
                    // onTimeChange={handleTimeChange}
                    withPortal
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className='border border-black hover:cursor-pointer '
                />
                <button className='bg-[#6E4975] font-inder text-white  rounded-md px-4 ms-2' onClick={handleAddSlot}>Add Slot</button>
            </div>

            <div className='flex justify-center'>
                {slots && slots.length > 0 ? (
                    <div className=' w-1/2 grid grid-cols-2 justify-center items-center mt-10'>
                        {
                            slots.map((item, index) => (
                                <div key={index} className="div bg-[#95B4E0]  my-1 mx-4 px-2 py-1 rounded-md">
                                    {new Date(item.date).toLocaleString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        weekday: 'long', // to display the day
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                    })}
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="text-center font-medium mt-10">
                        You have no slots added yet...
                    </div>
                )}
            </div>



        </div>
    )
}

export default Slots
