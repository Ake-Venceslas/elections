// ...existing code...
import MainNavbar from '@/main/Navbar/MainNavbar'
import MainVisitorGuide from '@/main/guide/MainVisitorGuide'
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
          <MainVisitorGuide />
        </div>
      </div>
    </div>
  )
}