import React, { useEffect } from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Axios } from '../../Axios/users';


function AppointmentScheduleModal({ doctorId, isOpen, onclose }) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [availableSlots, setAvailableSlots] = useState([]);

    // useEffect(()=>{
    //     Axios.get(`/available_slots/${doctorId}`).then((response) =>{
    //         if(response.data){
    //             console.log(response.data)
    //         }
    //     }).catch((error)=>{
    //         console.log("error",error)
    //     })
    // },[doctorId])

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            try {
                await Axios.get(`/available_slots?doctorId=${doctorId}&date=${selectedDate}`).then((response) => {
                    if (response.data) {
                        console.log(response.data.slots)
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
    


    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`} >
            <div className="modal-content  rounded-lg overflow-hidden p-12 max-w-3xl mx-auto text-start">
                <section className="modal-body">
                    <div className="flex">
                        <Calendar minDate={new Date()} onChange={handleDateChange} />
                        <div className='ms-6'>
                            {availableSlots?.map((slot, index) => {
                
                                const formattedTime = new Date(slot.date).toLocaleTimeString();

                                return (
                                    <div key={index} className='border border-gray-400 my-2 px-6 py-1 rounded-md'>{formattedTime}</div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                <footer className="modal-footer border-t pt-4 mt-4 flex flex-col sm:flex-row sm:justify-between">
                    <button className="button block w-full bg-[#E38569] hover:bg-[#e07757] text-white font-semibold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">Submit</button>
                    <button className="authbtn block w-full" onClick={() => onclose(false)}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default AppointmentScheduleModal
