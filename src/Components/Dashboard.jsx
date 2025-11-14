import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

function Dashboard() {
  const [profile, setProfile] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaints/my", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // Submit complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/complaints/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // backend will extract studentId from this
        },
        body: JSON.stringify({ category, title, description }),
      });
      const data = await res.json();
      setComplaints([data, ...complaints]); // Add new complaint on top
      setCategory("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };
  const fetchProfile = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/profile", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setProfile(data);
  } catch (err) {
    console.error(err);
  }
};
 const deleteComplaint = async (complaintId) => {
  const token = localStorage.getItem("token");

  // Step 1: Confirmation Popup
  const confirmDelete = await Swal.fire({
    title: "⚠️ Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#DC2626", // Tailwind red-600
    cancelButtonColor: "#6B7280",  // Tailwind gray-500
    background: "#F9FAFB",         // Tailwind gray-50
    color: "#1F2937",              // Tailwind gray-800
    customClass: {
      popup: "rounded-2xl shadow-lg",
      confirmButton: "rounded-lg text-white font-semibold px-4 py-2",
      cancelButton: "rounded-lg font-semibold px-4 py-2",
    },
  });

  if (!confirmDelete.isConfirmed) return; // user cancelled

  try {
    const res = await fetch(`http://localhost:5000/api/complaintd/student/${complaintId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const data = await res.json();

    // Step 2: Success popup
    if (data.success) {
      Swal.fire({
        title: "✅ Complaint Deleted!",
        text: "Your complaint has been successfully removed.",
        icon: "success",
        confirmButtonColor: "#2563EB", // Tailwind blue-600
        background: "#F9FAFB",
        color: "#1F2937",
        customClass: {
          popup: "rounded-2xl shadow-lg",
          confirmButton: "rounded-lg text-white font-semibold px-4 py-2",
        },
      });

      setComplaints(complaints.filter((c) => c._id !== complaintId));
    } else {
      Swal.fire({
        title: "❌ Failed!",
        text: data.message || "Could not delete complaint.",
        icon: "error",
        confirmButtonColor: "#DC2626",
        background: "#F9FAFB",
        color: "#1F2937",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "🚫 Error",
      text: "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonColor: "#DC2626",
      background: "#F9FAFB",
      color: "#1F2937",
    });
  }
};

const fetchNotices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notices/getNotices");
      if (!res.ok) throw new Error("Failed to fetch notices");
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  // Load complaints on mount
  useEffect(() => {
     fetchProfile();
    fetchComplaints();
    fetchNotices();
  }, []);

  // Stats
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;

  return (
    <div className="min-h-screen flex bg-green-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-orange-100 shadow-lg transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
      >
        <div className="p-6 text-center border-b">
          <h2 className="text-2xl font-bold text-indigo-600">HavenStay</h2>
        </div>
        <div className="p-6 flex flex-col items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-md">
  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-600 text-white text-3xl font-bold shadow-lg">
    👤
  </div>
  <h2 className="text-2xl font-bold text-gray-800">{profile.fullName}</h2>
  <p className="text-lg text-gray-600 font-medium">
    🏠 Room: <span className="text-indigo-600">{profile.hostel}-{profile.roomNumber}</span>
  </p>
  <p className="text-lg text-gray-600 font-medium">
    📞 Contact: <span className="text-indigo-600">{profile.phone}</span>
  </p>
</div>
       <nav className="mt-6 flex-1">
  <ul className="flex flex-col gap-2 px-4">
    {[
      { label: "Dashboard", icon: "📌" },
      { label: "Raise Complaint", icon: "📝" },
      { label: "My Complaints", icon: "📂" },
      { label: "Notices", icon: "📢" },
    ].map((item, idx) => (
      <li
        key={idx}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium 
                   hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-all duration-300"
      >
        <span className="text-xl">{item.icon}</span>
        <span className="text-lg">{item.label}</span>
      </li>
    ))}
  </ul>
</nav>
        <div className="p-6 border-t text-center">
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
        <div className="p-6 border-t text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            WELCOME {profile.fullName}
          </h1>
          {/* Mobile Menu */}
          <button
            className="md:hidden bg-indigo-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Total Complaints</h2>
            <p className="text-2xl font-bold text-indigo-600">{total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Pending</h2>
            <p className="text-2xl font-bold text-red-500">{pending}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Resolved</h2>
            <p className="text-2xl font-bold text-green-500">{resolved}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">In Progress</h2>
            <p className="text-2xl font-bold text-blue-500">{inProgress}</p>
          </div>
        </div>

        {/* Raise Complaint Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Raise a Complaint
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <select
              className="border p-2 rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option>Electricity</option>
              <option>Water</option>
              <option>Cleanliness</option>
              <option>Food</option>
              <option>Wi-Fi</option>
            </select>
            <input
              type="text"
              placeholder="Complaint Title"
              className="border p-2 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Describe your issue..."
              className="border p-2 rounded-lg md:col-span-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg md:col-span-2 hover:bg-indigo-700">
              Submit Complaint
            </button>
          </form>
        </div>

        {/* My Complaints */}
       <div className="bg-white p-6 rounded-lg shadow mb-6">
  <h2 className="text-xl font-bold mb-4 text-gray-700">My Complaints</h2>

  {/* Table for medium+ screens */}
  <div className="hidden md:overflow-x-auto md:block">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-600 text-left">
          <th className="p-3">ID</th>
          <th className="p-3">Title</th>
          <th className="p-3">Category</th>
          <th className="p-3">Description</th>
          <th className="p-3">Status</th>
          <th className="p-3">Date</th>
          <th className="p-3">Delete</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((c, i) => (
          <tr key={c._id} className="border-b">
            <td className="p-3">{i + 1}</td>
            <td className="p-3">{c.title}</td>
            <td className="p-3">{c.category}</td>
            <td className="p-3">{c.description}</td>
            <td
              className={`p-3 font-semibold ${
                c.status === "Pending"
                  ? "text-red-500"
                  : c.status === "Resolved"
                  ? "text-green-500"
                  : "text-blue-500"
              }`}
            >
              {c.status}
            </td>
            <td className="p-3">
              {new Date(c.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </td>
            <td className="p-3">
              {c.status === "Pending" && (
                <button
                  onClick={() => deleteComplaint(c._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Card layout for mobile */}
  <div className="md:hidden flex flex-col gap-4">
    {complaints.map((c, i) => (
      <div
        key={c._id}
        className="bg-gray-50 border rounded-lg p-4 shadow flex flex-col gap-2"
      >
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-600">{i + 1}</span>
          {c.status === "Pending" && (
            <button
              onClick={() => deleteComplaint(c._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-sm"
            >
              Delete
            </button>
          )}
        </div>
        <p>
          <span className="font-semibold">Title:</span> {c.title}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {c.category}
        </p>
        <p>
          <span className="font-semibold">Description:</span> {c.description}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`font-semibold ${
              c.status === "Pending"
                ? "text-red-500"
                : c.status === "Resolved"
                ? "text-green-500"
                : "text-blue-500"
            }`}
          >
            {c.status}
          </span>
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(c.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    ))}
  </div>
</div>


        {/* Notices */}
       <div className="bg-red-200 p-6 rounded-lg shadow">
  <h2 className="text-xl font-bold mb-4 text-gray-700">Hostel Notices</h2>

  {notices.length === 0 ? (
    <p className="text-gray-600">No notices available right now.</p>
  ) : (
    <ul className="list-disc list-inside text-gray-700 space-y-1">
      {notices.map((n) => (
        <li key={n._id}>
          <span className="font-semibold">{n.description}</span> ({new Date(n.date).toLocaleString()})
        </li>
      ))}
    </ul>
  )}
</div>
      </main>
    </div>
  );
}

export default Dashboard;
