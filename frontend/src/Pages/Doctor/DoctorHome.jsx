import React from 'react'
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor'
import Header from '../../Components/Doctor/Header'
// import { useEffect } from 'react'
// import { useCookies } from 'react-cookie';

function DoctorHome() {
  // const [cookies, setCookie] = useCookies(['jwtdoctor']);

  // useEffect(() => {
  //   // Retrieve the value of the 'jwtdoctor' cookie using react-cookie
  //   const jwtDoctorCookie = cookies['jwtdoctor'];
    
  //   // Log the cookie value
  //   console.log('JWT Doctor Cookie:', jwtDoctorCookie);
  // }, [cookies]);
   
  return (
    <div>
      <NavbarDoctor/>
      <Header/>
    </div>
  )
}

export default DoctorHome
