import React, { useEffect, useState } from 'react'
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor'
import Header from '../../Components/Doctor/Header'
import { useSelector } from 'react-redux'
import { Axios } from '../../Axios/doctor'

function MedicalRecords() {
    const doctorInfo = useSelector((state) => state.doctor.doctor)
    const id = doctorInfo?._id
    const [medicalReport, setMedicalReport] = useState(null)

    useEffect(() => {
        Axios.get(`/medicalReport/${id}`).then((response) => {
            if (response.data) {
                setMedicalReport(response.data)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }, [])

    return (
        <div>
            <NavbarDoctor />
            <Header title='medicalrecords' />

            <div className="mt-6">
                {
                    medicalReport && medicalReport.map((report, index) => (
                        <div className="bg-[#c2d1e6] mx-20 rounded-md flex flex-row p-3 font-inder">
                            <div className="flex flex-col text-start p-1">
                                <div className="flex flex-row">
                                    <div className="div">
                                        {report.user.name}
                                    </div>
                                    <div className="mx-6 text-sm">
                                        {new Date(report.appointmentDate).toLocaleString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            // weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                                <div className="div">
                                    {report.report}
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default MedicalRecords
