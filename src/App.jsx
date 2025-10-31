import React from 'react'
import Navbar from './Components/Navbar'
import Features from './Components/Features'
import Register from './Components/Register'
import Footer from './Components/Footer'
import Signup from './Components/Signup'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route , Navigate} from "react-router";
import SignupA from './Components/SignupA'
import LoginA from './Components/LoginA'
import Dashboard from './Components/Dashboard'
import PrivateRoute from './Components/PrivateRoute'
import DashboardA from './Components/DashboardA'
import PrivateRouteA from './Components/PrivateRouteA'
import About from './Components/About'
function App() {
  return (
  <>
     {/* <Navbar /> */}
 {/* <div className="min-h-screen w-full" style={{ backgroundColor: "#fffdd0ff" }}> */}
      <Routes>
        {/* Home Page */}
        
        <Route
          path="/"
          element={
           
           <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-lime-50 to-amber-50">
  <Navbar />

  {/* Hero Section */}
  <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center mt-20">
    
    {/* Title */}
    <h1
      className="text-4xl sm:text-5xl lg:text-7xl font-extrabold 
      bg-gradient-to-r from-emerald-600 via-lime-500 to-yellow-400 
      bg-clip-text text-transparent leading-tight tracking-wide 
      drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] max-w-4xl 
      transition-all duration-700 ease-in-out hover:scale-105"
    >
      Voice Your Concerns, Improve Your Hostel
    </h1>

    {/* Subtitle */}
    <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl font-medium">
      Report issues easily and help make your hostel a better place for everyone.
    </p>

              </div>
              
              <Features />
              <Register />
              <div>
              <Footer />
              </div>
            </div>
            
          }
        />
      
        {/* Signup Page */}
         {/* <Route path="/" element={  <Navbar />}/> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/asignup" element={<SignupA />} />
        <Route path="/alogin" element={<LoginA />} />
               <Route
        path="/dashboard"
        element={
          <PrivateRoute role="student">
            <Dashboard />
          </PrivateRoute>
        }
      />
       <Route
        path="/adashboard"
        element={
          <PrivateRoute role="admin">
            <DashboardA />
          </PrivateRoute>
        }
      />
      <Route path="/about" element={<About />} />
      </Routes>
      {/* </div> */}
    </>
  )
}

export default App
