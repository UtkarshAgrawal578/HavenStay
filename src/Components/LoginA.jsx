import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

function LoginA() {
  const [credentials, setCredentials] = useState({
    adminId: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/alogin", {
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
      localStorage.setItem("role", "admin");

      // ✅ Stylish SweetAlert2 popup
      Swal.fire({
        title: "👑 Admin Login Successful!",
        text: "Welcome back, Administrator!",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
        confirmButtonColor: "#2563EB", // Tailwind blue-600
        background: "#F9FAFB", // Tailwind gray-50
        color: "#1F2937", // Tailwind gray-800
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
        navigate("/adashboard"); // ✅ Redirect after popup
      });
    } else {
      Swal.fire({
        title: "❌ Login Failed",
        text: json.error || "Invalid credentials",
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
    <section className="w-full min-h-screen bg-violet-100 flex items-center justify-center px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
      🛡️ Admin Login
    </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Admin ID */}
          <div>
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

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        {/* Redirect */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/asignup"
            className="text-green-600 hover:text-green-700 font-medium transition"
          >
            Sign Up here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginA;
