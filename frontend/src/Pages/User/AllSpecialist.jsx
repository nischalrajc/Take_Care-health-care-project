import React from 'react'
import NavBar from '../../Components/User/NavBAr'
import DoctorsCard from '../../Components/User/DoctorsCard'
import { useState, useEffect } from 'react'
import { Axios } from '../../Axios/users'
import Footer from '../../Components/User/Footer'

function AllSpecialist() {
    const [array, setArray] = useState(null)

    const fetchData = async () => {
        await Axios.get('/listDoctors').then((response) => {
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
            <NavBar />

            <div className="mt-7 font-medium">
                Our Doctors
            </div>
            <div className="mt-3">
                Empowering lives through compassionate care: Where expertise meets empathy, and healing begins.
            </div>

            <DoctorsCard array={array} />

            <Footer />
        </div>
    )
}

export default AllSpecialist
