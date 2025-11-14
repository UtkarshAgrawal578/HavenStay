import { useState } from "react";
import { Link } from "react-router";
import { Home } from "lucide-react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
<nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-orange-800/70 text-white shadow-lg z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5 md:py-6">

        {/* Logo */}
   <div className="flex items-center gap-2 cursor-pointer transform transition-all duration-500 hover:scale-105 select-none">
      {/* Icon with new color */}
      <img
  src="/Hostel.png"
  alt="Hostel Logo"
  className="w-8 h-8 md:w-10 md:h-10 object-contain"
/>

      {/* Logo Text */}
      <div
        className="text-2xl md:text-3xl font-extrabold 
        bg-gradient-to-r from-yellow-300 via-lime-300 to-white 
        bg-clip-text text-transparent 
        drop-shadow-[0_1px_5px_rgba(255,255,255,0.25)] 
        tracking-wide 
        transition-all duration-500 ease-in-out 
        hover:brightness-110"
      >
        HavenStay
      </div>
    </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 text-lg font-semibold">
          <li><Link to="/" className="hover:text-yellow-400 transition duration-300 hover:scale-105">Home</Link></li>
          <li><a href="#features" className="hover:text-yellow-400 transition duration-300 hover:scale-105">Features</a></li>
          <li><Link to="/about" className="hover:text-yellow-400 transition duration-300 hover:scale-105">About</Link></li>
          <li><a href="#register" className="hover:text-yellow-400 transition duration-300 hover:scale-105">Register</a></li>
          <li><Link to="/dashboard" className="hover:text-yellow-400 transition duration-300 hover:scale-105">Dashboard</Link></li>
        </ul>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none transition-transform duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`h-1 w-7 bg-white rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`h-1 w-7 bg-white rounded transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`h-1 w-7 bg-white rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-xl bg-green-900/80 border-t border-green-700/40 transition-all duration-500">
          <ul className="flex flex-col items-center gap-6 py-6 text-lg font-medium">
            <li><Link to="/" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><a href="#features" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Features</a></li>
            <li><Link to="/about" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><a href="#register" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Register</a></li>
            <li><Link to="/dashboard" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
