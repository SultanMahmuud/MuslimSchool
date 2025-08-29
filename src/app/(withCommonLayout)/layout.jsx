"use client"
import Footer from '@/components/Shared/Footer/Footer'
import Navbar from '@/components/Shared/Navber/Navber'
import React from 'react'

const CommonLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content grows to fill remaining space */}
      <main className="flex-1 min-h-[200vh]">
        {children}
      </main>

      {/* Footer always sticks at bottom */}
      <Footer />
    </div>
  )
}

export default CommonLayout
