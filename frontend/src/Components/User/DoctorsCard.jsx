import React, { useEffect, useState } from 'react'
import { Axios } from '../../Axios/users'

function DoctorsCard() {
    const [array, setArray] = useState(null)

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
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-4 sm:mx-20 py-8'>
                {
                    array?.map((doctor, index) => (
                        <>
                            <div>
                                <div key={index} className='border rounded-md border-black mx-2 sm:h-96 h-48' style={{ overflow: 'hidden'}} >
                                    <img className="w-full h-full object-cover" src={doctor?.image} alt="doctors" />
                                </div>
                                <div className="mt-2">{doctor?.name}</div>
                            </div>
                        </>
                    ))
                }

            </div>
        </div>
    )
}

export default DoctorsCard