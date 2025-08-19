// src/components/DashboardLayout.tsx
import { Outlet } from "react-router-dom"
import  Sidebar  from "./Sidebar"
import { DashboardHeader } from "./DashboardHearder"

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* L'Outlet rendra le composant de la route enfant active (Dashboard, Prospects, etc.) */}
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout