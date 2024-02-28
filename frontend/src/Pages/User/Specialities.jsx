import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Axios } from '../../Axios/users'
import NavBar from '../../Components/User/NavBAr'
import DoctorsCard from '../../Components/User/DoctorsCard'
import Footer from '../../Components/User/Footer'

function Specialities() {
    const [specialisation, setspecialisation] = useState('')
    const [array,setArray] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        Axios.get(`/specialities/${id}`, { withCredentials: true }).then((response) => {
            if (response) {
                setspecialisation(response.data.specialisation)
                setArray(response.data.doctors)
            }
        }).catch((error) => {
            console.log("error", error)
        })

    },[id])

    return (
        <div>
            <NavBar />

            <div className='font-medium my-6'>
                {specialisation.specialisation}
            </div>
            <div className='flex justify-center'>
                <div className="w-3/5 h-96">
                    <img className='w-full h-full object-cover' src={specialisation.image} alt='speciality-pic' />
                </div>
            </div>
            <div className="my-6 mx-10">
                {specialisation.description}
            </div>

            <div>
                <DoctorsCard array={array} appointment={true}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Specialities
