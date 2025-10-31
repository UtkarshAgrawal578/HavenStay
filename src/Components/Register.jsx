import React from 'react'
import './Regiter.css'
import { useEffect, useRef } from "react";
import { Link } from "react-router";

function Register() {
      const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");   // play animation
          } else {
            entry.target.classList.remove("show"); // reset when out of view
          }
        });
      },
      { threshold: 0.2 } // trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <div>
     <section id="register" className="w-full bg-gray-10 py-16 px-4 flex justify-center mt-100 mb-200">
  <div
    ref={sectionRef}
    className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-1 gap-50 slide-up"
  >
    {/* Student Registration */}
   <div className="flex flex-col items-center gap-12 px-6 py-16">

  {/* Student Registration */}
  <div className="text-center my-8 px-4">
  <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black-600 leading-tight border-b-4 border-black-600 pb-2 inline-block">
    Register Here
  </h2>
</div>
  <div className="w-full max-w-md bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105">
    <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-6 tracking-wide">
      Student Registration
    </h2>
    <p className="text-gray-600 mb-6 max-w-xs">
      Sign up as a student and start reporting your hostel issues effortlessly.
    </p>
    <Link to="/signup">
      <button
        type="button"
        className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        Register as Student
      </button>
    </Link>
  </div>

  {/* Admin Registration */}
  <div className="w-full max-w-md bg-gradient-to-br from-green-100 to-green-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 mt-10">
    <h2 className="text-2xl sm:text-3xl font-extrabold text-green-800 mb-6 tracking-wide">
      Admin Registration
    </h2>
    <p className="text-gray-600 mb-6 max-w-xs">
      Sign up as an admin to manage and resolve student complaints efficiently.
    </p>
    <Link to="/asignup">
      <button
        type="button"
        className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-2xl shadow-lg hover:bg-green-700 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        Register as Admin
      </button>
    </Link>
  </div>

</div>

  </div>
</section>

    </div>
  )
}

export default Register
