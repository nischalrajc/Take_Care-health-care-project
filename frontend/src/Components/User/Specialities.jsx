import React from 'react'
import { Axios } from '../../Axios/users'
import { useEffect, useState } from 'react'

function Specialities() {
  const [array, setArray] = useState(null)

  const fetchData = async () => {
    await Axios.get('/listSpecialities', { withCredentials: true }).then((response) => {
      if (response.data) {
        setArray(response.data.specialisation)
      }
    }).catch((error) => {
      console.log("error", error)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="">
      <div className={`grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-4 grid-cols-2 mx-10`} >

        {
          array?.map((speciality, index) => (
            <div key={index} className=" mx-2 my-6">
              <img className='w-full h-full object-cover rounded-xl' src={speciality.image} alt='speciality-pic' />
              <div className=''>
                {speciality.specialisation}
              </div>
            </div>
          ))
        }

      </div>
    </div>

  )

}

export default Specialities
