import React, { useEffect, useState } from 'react'
import ProfileBar from '../../Components/User/ProfileBar'
import ProfileHeader from '../../Components/User/ProfileHeader'
import { useSelector } from 'react-redux'
import { Axios } from '../../Axios/users'
import Footer from '../../Components/User/Footer'

function MedicalReport() {
    const userInfo = useSelector((state) => state.user.user)
    const userId = userInfo?._id
    const [medicalReport, setMedicalReport] = useState(null)
    

    useEffect(() => {
        Axios.get(`/medicalReport/${userId}`).then((response) => {
            if (response.data) {
                setMedicalReport(response.data)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    })

    return (
        <div>
            <ProfileBar />
            <ProfileHeader title='MedicalRecords'  />

            <div className="mt-6">
                {medicalReport && medicalReport.length > 0 ? (
                    medicalReport.map((report, index) => (
                        <div className="bg-[#c2d1e6] mx-2 md:mx-10 rounded-md flex flex-row p-3 mb-2 text-xs sm:text-base" key={index}>
                            <div className="mx-10">
                                <img className="w-16 h-16 object-cover rounded-full cursor-pointer" src={report?.doctor?.image || "/profilepic.jpg"} alt="Icon" />
                            </div>
                            <div className="flex flex-col text-start p-1">
                                <div className="flex flex-row">
                                    <div className="div">
                                        {report.doctor.name}
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
                ) : (
                    <p>You don't have any medical reports.</p>
                )}
            </div>
        </div>
    )
}

export default MedicalReport
