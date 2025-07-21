
import Footer from '@/components/Shared/Footer/Footer'
import  Navbar  from '@/components/Shared/Navber/Navber'
import React from 'react'

const CommonLayout = ({ children }) => {
  return (
    <div>
   <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}

export default CommonLayout
