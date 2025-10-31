import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
function SignupA() {
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    phone: "",
    hostel: "",
    Designation: "",
    password: "",
    adminId: ""
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Password match validation
  if (credentials.password !== credentials.confirmPassword) {
    Swal.fire({
      title: "⚠️ Password Mismatch",
      text: "Your passwords do not match. Please recheck and try again.",
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
    const response = await fetch("http://localhost:5000/api/auth/CreateuserA", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);

      // ✅ Success popup with animation
      Swal.fire({
        title: "👑 Admin Signup Successful!",
        text: "Your admin account has been created successfully.",
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
        navigate("/alogin"); // redirect after popup
      });
    } else {
      Swal.fire({
        title: "❌ Signup Failed",
        text: json.error || "Something went wrong during signup.",
        icon: "error",
        confirmButtonColor: "#DC2626", // Tailwind red-600
        background: "#F9FAFB",
        color: "#1F2937",
        customClass: {
          popup: "rounded-2xl shadow-lg",
          confirmButton: "rounded-lg text-white font-semibold px-4 py-2",
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "🚫 Server Error",
      text: "Something went wrong. Please try again later.",
      icon: "error",
      confirmButtonColor: "#DC2626",
      background: "#F9FAFB",
      color: "#1F2937",
    });
  }
};

  return (
    <section className="w-full min-h-screen bg-green-100 flex justify-center items-center px-4">
  <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
      🛡️ Admin Sign Up
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation / Role
            </label>
            <input
              type="text"
              name="Designation"
              value={credentials.Designation}
              onChange={handleChange}
              placeholder="E.g., Warden, Supervisor"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Admin ID */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin ID
            </label>
            <input
              type="text"
              name="adminId"
              value={credentials.adminId}
              onChange={handleChange}
              placeholder="Enter Admin ID"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-8 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Redirect */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/alogin"
            className="text-green-600 hover:text-green-700 font-medium transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignupA;
