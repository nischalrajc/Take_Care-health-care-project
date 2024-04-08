import React, { useState, useEffect } from 'react'
import ProfileBar from '../../Components/User/ProfileBar'
import ProfileHeader from '../../Components/User/ProfileHeader'
import { Axios } from '../../Axios/users'
import { useSelector } from 'react-redux'

function Payments() {

    const userInfo = useSelector((state) => state.user.user)
    const id = userInfo?._id

    const [payments, setPayments] = useState([])

    useEffect(() => {
        Axios.get(`/paymentHistory/${id}`).then((response) => {
            if (response.data) {
                setPayments(response.data.payment)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }, [])

    return (
        <div>
            <ProfileBar />
            <ProfileHeader title='payments' />

            <div className="mt-8 mx-auto">
                {payments.length > 0 ? (
                    <table className='table-auto mx-auto'>
                        <thead className=''>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Doctor</th>
                                {/* <th>Specialisation</th> */}
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody className=' text-sm'>
                            {payments.map((item, index) => (
                                <tr key={index}>
                                    <td className="p-2">
                                        {new Date(item.date).toLocaleDateString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className="p-2">
                                        {new Date(item.date).toLocaleTimeString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        })}
                                    </td>
                                    <td className="p-4">{item.doctor.name}</td>
                                    {/* <td className="p-4">{item.doctor.specialisation}</td> */}
                                    <td className="p-4">{item.doctor.fees}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        You don't have any payments made.
                    </div>
                )}
            </div>



        </div>
    )
}

export default Payments
