import React from 'react'
import { useState } from 'react'

function AppointmentScheduleModal({ isOpen,onclose }) {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [description,setDescription] = useState('')

    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`} >
            <div className="modal-content  rounded-lg overflow-hidden p-16 max-w-3xl mx-auto text-start">
                <section className="modal-body">
                    <div className="field mb-4">
                        <label className="block text-sm font-inder">Name</label>
                        <input
                            className="border-gray-500 w-full border-2 rounded-md font-inder  px-1"
                            type="text"
                            placeholder=" name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="field mb-4">
                        <label className="block text-sm  font-inder">Email</label>
                        <input
                            className="border-gray-500 w-full border-2  px-1 rounded-md"
                            type="text"
                            placeholder=" email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field mb-4">
                        <label className="block text-sm  font-inder">Phone</label>
                        <input
                            className="border-gray-500 w-full border-2 rounded-md px-1"
                            type="text"
                            placeholder=" phone number"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                    </div>
                    <div className="field mb-4">
                        <label className="block text-sm  font-inder">Briefly describe your condition</label>
                        <textarea
                            className="border-gray-500 border-2  w-full  rounded-md px-1"
                            placeholder=" type here"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
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
