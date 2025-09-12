import MainBar from '@/main/bar/MainBar'
import MainNavbar from '@/main/Navbar/MainNavbar'
import MainSettings from '@/main/params/MainSettings'
import React from 'react'

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}

      <MainNavbar />

      {/* Main content area with sidebar and hero */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}

        <MainBar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <MainSettings />
        </div>
      </div>
    </div>
  )
}