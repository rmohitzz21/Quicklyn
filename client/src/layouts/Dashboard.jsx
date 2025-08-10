import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-3 grid lg:grid-cols-[260px,1fr] gap-4">
        
        {/* Left Sidebar */}
        <div 
          className="py-5 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto 
          hidden lg:block rounded-xl shadow-md border border-gray-200 bg-white/90 backdrop-blur-sm 
          animate-slideInLeft"
        >
          <UserMenu />
        </div>

        {/* Right Content Area */}
        <div 
          className="bg-white rounded-xl shadow-sm min-h-[75vh] p-5 
          border border-gray-200 animate-fadeIn"
        >
          <Outlet />
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn .4s ease-out;
          }

          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-20px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slideInLeft {
            animation: slideInLeft .4s ease-out;
          }
        `}
      </style>
    </section>
  )
}

export default Dashboard
