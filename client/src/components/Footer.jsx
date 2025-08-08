import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4  text-centerflex-col gap-2'>
            <p> ©All Rights Reserved 2025</p>
           <div className='flex items-center gap-4 justify-center'>
              <a href= "" className='hover:text-primary'>
                <FaFacebook/>
              </a>
              <a href= "" className='hover:text-primary'>
                <FaInstagram/>
              </a>
              <a href= "" className='hover:text-secondary'>
                <FaLinkedin/>
              </a>
           </div>
        </div>
    </footer>
  )
}

export default Footer