import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


function Footer() {
  return (
    <div>
      <div className="bg-[#9CBCB7] py-16 grid grid-cols-1 sm:grid-cols-3 gap-1 mt-16 ">

        <div className="flex  space-x-6 ju justify-center md:justify-end mb-2 sm:mb-0">
          <FaLinkedin className="cursor-pointer"/>
          <FaInstagram className="cursor-pointer"/>
          <FaFacebookSquare className="cursor-pointer"/>
          <FaTwitter className="cursor-pointer"/>
        </div>

        <div className="text-center ">
          <div className=" mb-1">takecare@gmail.com</div>
          <div className=" mb-1">+91 91234578602</div>
          <div className=" mb-1">+91 90124573622</div>
        </div>

        <div className="md:text-start ">
          <div className=" mb-1">contact</div>
          <div className=" mb-1">Gandhi Nagar 2nd Street,</div>
          <div className=" mb-1">Bangalore,2h4</div>
        </div>

      </div>
    </div>
  )
}

export default Footer
