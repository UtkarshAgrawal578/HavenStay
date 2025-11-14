import React from 'react'

function Footer() {
  return (
    <div>
      <section>
  <footer className="w-full bg-orange-900/60 backdrop-blur-md text-white py-12 shadow-lg">
    <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-4">
      
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-wide flex items-center gap-2">
  <img
    src="/Hostel.png"
    alt="Hostel Logo"
    className="w-10 h-10 object-contain hover:scale-105 transition-transform duration-300"
  />
  HavenStay
</h2>


      {/* Contact Info */}
      <p className="text-sm sm:text-base">📧 utkarshzhcet123@gmail.com</p>
      <p className="text-sm sm:text-base">📞 +91 9027548463</p>

      {/* Social Links */}
      <div className="flex space-x-8 text-2xl mt-2">
        <a href="#" className="hover:text-yellow-300 transition-colors duration-300">🌐</a>
        <a href="#" className="hover:text-yellow-300 transition-colors duration-300">🐦</a>
        <a href="#" className="hover:text-yellow-300 transition-colors duration-300">📘</a>
        <a href="#" className="hover:text-yellow-300 transition-colors duration-300">📸</a>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-green-700/40 mt-8 pt-4 text-center text-sm sm:text-base text-green-200">
      © {new Date().getFullYear()} Hostel Complaint App. All rights reserved.
    </div>
  </footer>
</section>
    </div>
  )
}

export default Footer
