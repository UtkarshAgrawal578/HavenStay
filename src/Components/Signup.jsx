import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

function Signup() {
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    // confirmPassword: "",
    hostel: "",
    roomNumber: "",
    studentId: "",
    course: "",
    year: "",
    branch: ""
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Password match validation
  if (credentials.password !== credentials.confirmPassword) {
    Swal.fire({
      title: "⚠️ Password Mismatch",
      text: "Your passwords do not match. Please recheck.",
      icon: "warning",
      confirmButtonColor: "#F59E0B", // Tailwind amber-500
      background: "#F9FAFB", // Tailwind gray-50
      color: "#1F2937", // Tailwind gray-800
      customClass: {
        popup: "rounded-2xl shadow-lg",
        confirmButton: "rounded-lg text-white font-semibold px-4 py-2",
      },
    });
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/Createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);

      // ✅ Signup success popup
      Swal.fire({
        title: "🎉 Signup Successful!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#2563EB", // Tailwind blue-600
        background: "#F9FAFB",
        color: "#1F2937",
        customClass: {
          popup: "rounded-2xl shadow-lg",
          confirmButton: "rounded-lg text-white font-semibold px-4 py-2",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(() => {
        navigate("/login"); // redirect after popup close
      });
    } else {
      Swal.fire({
        title: "❌ Signup Failed",
        text: json.error || "Something went wrong while signing up.",
        icon: "error",
        confirmButtonColor: "#DC2626", // Tailwind red-600
        background: "#F9FAFB",
        color: "#1F2937",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "🚫 Error",
      text: "Something went wrong. Please try again later.",
      icon: "error",
      confirmButtonColor: "#DC2626",
      background: "#F9FAFB",
      color: "#1F2937",
    });
  }
};


  return (
    <section className="w-full min-h-screen bg-violet-100 flex justify-center items-center px-4">
  <div className="w-full max-w-3xl bg-gray-100 rounded-2xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
      🧑‍🎓 Student Sign Up
    </h2>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={credentials.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={credentials.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Hostel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hostel Name / Number
            </label>
            <input
              type="text"
              name="hostel"
              value={credentials.hostel}
              onChange={handleChange}
              placeholder="E.g., Hostel A / 3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              value={credentials.roomNumber}
              onChange={handleChange}
              placeholder="E.g., 204"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number / Student ID
            </label>
            <input
              type="text"
              name="studentId"
              value={credentials.studentId}
              onChange={handleChange}
              placeholder="Enter your roll number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course / Year
            </label>
            <input
              type="text"
              name="course"
              value={credentials.course}
              onChange={handleChange}
              placeholder="E.g., BTech"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={credentials.year}
              onChange={handleChange}
              placeholder="E.g., 2"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              min="1"
              max="6"
            />
          </div>

          {/* Branch */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department / Branch
            </label>
            <input
              type="text"
              name="branch"
              value={credentials.branch}
              onChange={handleChange}
              placeholder="E.g., Computer Science"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Redirect */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
