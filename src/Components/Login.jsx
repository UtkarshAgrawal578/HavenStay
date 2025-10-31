import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
   

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  try {
    const response = await fetch("http://localhost:5000/api/auth/slogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.authToken);
      localStorage.setItem("role", "student");

      // ✅ Stylish popup using SweetAlert2
      Swal.fire({
        title: "🎉 Login Successful!",
        text: "Welcome back, student 👋",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#2563EB", // Tailwind's blue-600
        background: "#F9FAFB", // Tailwind gray-50
        color: "#1F2937", // Tailwind gray-800
        customClass: {
          popup: "rounded-2xl shadow-lg",
          confirmButton: "rounded-lg text-white font-semibold px-4 py-2",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp"
        }
      }).then(() => {
        navigate("/dashboard"); // Redirect after popup
      });
    } else {
      setErrorMsg(data.error || data.errors?.[0]?.msg || "Login failed");
    }
  } catch (error) {
    console.error(error);
    setErrorMsg("Server error. Please try again later.");
  }
};


  return (
    <div>
      <section className="w-full min-h-screen bg-green-100 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-gray-50 rounded-2xl shadow-xl p-10">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            🔑 Login
          </h2>

          <form className="space-y-7" onSubmit={handleSubmit}>
            {/* Student ID */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Student ID
              </label>
              <input
                type="text"
                placeholder="Enter your student ID"
                className="w-full px-5 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-5 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm sm:text-base">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded text-blue-600" />
                Remember Me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-red-600 text-center font-medium">{errorMsg}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 text-xl font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>

            {/* Signup Redirect */}
            <p className="text-center text-base text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
