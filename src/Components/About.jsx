import React from 'react'
import {Link} from "react-router";
function About() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-6 py-16">
      <div className="max-w-4xl bg-white shadow-2xl rounded-3xl p-10 border border-gray-200 transform transition-all duration-700 ease-out hover:scale-[1.01] hover:shadow-indigo-200">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 text-center transition-all duration-700 hover:text-indigo-800">
          About HavenStay
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center font-medium">
          <span className="font-bold text-indigo-600">HavenStay</span> is a
          next-gen platform designed to make hostel communication smoother, smarter, and more transparent.
          Students can report issues instantly and track progress with ease — all from their devices.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center font-medium">
          Whether it’s <span className="font-semibold text-blue-600">maintenance</span>,
          <span className="font-semibold text-green-600"> hygiene</span>, or
          <span className="font-semibold text-pink-600"> facility issues</span>,
          every complaint is handled efficiently and resolved quickly through a structured process.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed text-center font-medium">
          With <span className="font-semibold text-amber-600">real-time updates</span> and
          <span className="font-semibold text-rose-600"> role-based access</span>,
          this app ensures accountability, efficiency, and complete transparency between
          <span className="font-bold text-indigo-600"> students</span> and
          <span className="font-bold text-indigo-600"> administrators</span>.
        </p>

        <div className="mt-10 flex justify-center">
        <Link to="/">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl"
          >
            Go to Home
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
