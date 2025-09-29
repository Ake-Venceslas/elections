// ...existing code...
import MainDashBoard from '@/main/board/MainDashBoard'
import MainNavbar from '@/main/Navbar/MainNavbar'
import React from 'react'

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}

      <MainNavbar />

      {/* Main content area with sidebar and hero */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}

  {/* Sidebar supprimé */}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <MainDashBoard />
        </div>
      </div>
    </div>
  )
}