import React from 'react'
import NavBar from '../../Components/User/NavBAr'
import { useEffect, useState } from 'react'
import { Axios } from '../../Axios/users'

function FindOne() {
    const [array, setArray] = useState(null)

    useEffect(() => {
        Axios.get('/listDoctors', { withCredentials: true }).then((response) => {
            if (response.data) {
                console.log(response.data)
                setArray(response.data.doctors)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    // console.log(array)

    return (
        <div>
            <NavBar />
            <div className=' text-start mx-2 md:mx-12 lg:mx-24 xl:mx-32 my-6 text-base'>
                Find doctors available for you
            </div>

            {
                array?.map((doctor, index) => (
                    <>
                        {/* <div className="bg-red-600 sm:w-4/6 lg:w-3/5 mx-2 md:mx-12 lg:mx-24 xl:mx-32 flex flex-col sm:flex-row my-4 py-1 text-sm">

                            <div className="bg-green-700 sm:w-1/5 md:w-1/4">
                                <div className="border rounded-md border-black text-white sm:mx-auto sm:h-24 md:h-28  md:w-28 sm:w-20" style={{ overflow: 'hidden'}}>
                                    <img className="w-full h-full object-cover" src={doctor?.image} alt='doctors' />
                                </div>
                                <div className="div">{doctor?.name}</div>
                            </div>

                            <div className="bg-[#D9D9D9] border rounded-md flex flex-col justify-center sm:h-20 md:h-28 w-1/2 sm:w-3/4 md:w-3/4 lg:w-4/5 px-2 sm:py-2 md:py-0">
                                    <div className="text-start">{doctor?.specialisation}</div>
                                    <div className=" text-start overflow-hidden"  style={{ maxHeight: '4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {doctor?.bio}
                                    </div>
                            </div>
                        </div> */}

<div className=" sm:w-4/6 lg:w-3/5 mx-2 md:mx-12 lg:mx-24 xl:mx-32 flex flex-col sm:flex-row my-4 py-1 text-sm">

<div className=" sm:w-1/5 md:w-1/4 mb-2 sm:mb-0">
    <div className="border rounded-md border-black text-white sm:mx-auto sm:h-24 md:h-28 md:w-28 sm:w-20" style={{ overflow: 'hidden'}}>
        <img className="w-full h-full object-cover" src={doctor?.image} alt='doctors' />
    </div>
    <div className="text-center">{doctor?.name}</div>
</div>

<div className="bg-[#D9D9D9] border rounded-md flex flex-col justify-center sm:h-20 md:h-28 w-full sm:w-3/4 md:w-3/4 lg:w-4/5 px-2 py-2 md:py-0">
    <div className="text-start">{doctor?.specialisation}</div>
    <div className="text-start overflow-hidden" style={{ maxHeight: '4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {doctor?.bio}
    </div>
</div>
</div>

                    </>
                ))
            }

        </div>
    )
}

export default FindOne
