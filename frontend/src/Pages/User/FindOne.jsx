import React from 'react'
import NavBar from '../../Components/User/NavBAr'
import { useEffect, useState } from 'react'
import { Axios } from '../../Axios/users'
import Footer from '../../Components/User/Footer'

function FindOne() {
    const [showForm, setShowForm] = useState(true);
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


    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <NavBar />
            <div className=' text-start mx-2 md:mx-12 lg:mx-24 xl:mx-32 my-6 text-base'>
                Find doctors available for you
            </div>

            <div className='text-end px-6 '>
            <a onClick={handleToggleForm} className="sm:hidden lg:hidden mt-2 cursor-pointer">
                {showForm ? 'Hide Filter' : 'Apply Filters'}
            </a>
            </div>
            

            <div className=" flex md:me-4">
                <div className=" lg:w-4/5" style={{ maxHeight: '480px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
                    {
                        array?.map((doctor, index) => (
                            <>
                                <div key={index} className=" sm:w-fit md:w-5/6 mx-2 md:mx-12 lg:mx-24 xl:mx-32 flex flex-col sm:flex-row my-4 py-1 text-sm">

                                    <div className=" sm:w-1/5 md:w-1/4 mb-2 sm:mb-0">
                                        <div className="border rounded-md border-black text-white sm:mx-auto sm:h-24 md:h-28 md:w-28 sm:w-20" style={{ overflow: 'hidden' }}>
                                            <img className="w-full h-full object-cover" src={doctor?.image} alt='doctors' />
                                        </div>
                                        <div className="text-center">{doctor?.name}</div>
                                    </div>

                                    <div className=" border rounded-md flex flex-col justify-center sm:h-20 md:h-28 w-full sm:w-3/4 lg:w-4/5 px-2 py-2 md:py-0">
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

                <div className={` sm:w-1/5 ${showForm ? 'block' : 'hidden'} sm:block`}>

                    <form className="text-start">
                        <div className='text-start font-inder'>Filter</div>

                        <div className=' text-start mt-2 font-inder'>Specialisation</div>
                        <select className='border mt-2 border-black'>
                            <option value="all">All</option>
                            <option value="specialization1">Specialization 1</option>
                            <option value="specialization2">Specialization 2</option>
                        </select>

                        <div className="font-inder mt-2">Sex</div>
                        <div className="">
                            <label className='mr-4'>
                                <input type="checkbox" name="gender" value="male" />
                                Male
                            </label>
                            <label>
                                <input type="checkbox" name="gender" value="male" />
                                Female
                            </label>
                        </div>

                        <div className='flex mt-2'>
                            <button type="submit" className='bg-[#E38569] px-4 rounded-md text-white py-1'>Apply</button>
                            <button type="reset" className='text-[#E38569] ms-4'>Reset</button>
                        </div>
                    </form>
                    
                </div>

            </div>

            <Footer />

        </div>

    )
}

export default FindOne
