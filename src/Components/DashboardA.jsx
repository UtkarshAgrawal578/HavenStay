import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router";

function DashboardA() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
 const [notices, setNotices] = useState([]);
 const [noticeInput, setNoticeInput] = useState("");

  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/alogin");
  };

  // Fetch complaints (no auth-token)
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/complaintall/all-complaints");
        if (!res.ok) throw new Error("Failed to fetch complaints");
        const data = await res.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Update complaint status locally
  const handleStatusChange = (id, newStatus) => {
  fetch(`http://localhost:5000/api/admin/update-status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  })
    .then((res) => res.json())
    .then((updatedComplaint) => {
      // update local state: only change status, keep student info intact
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === updatedComplaint._id
            ? { ...c, status: updatedComplaint.status }
            : c
        )
      );
    })
    .catch((err) => console.error(err));
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
  // Add notice
  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!noticeInput.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/notice/addNotice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: noticeInput, description: noticeInput }),
      });

      if (!res.ok) throw new Error("Failed to add notice");

      setNoticeInput("");
      fetchNotices(); // refresh after adding
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };
useEffect(() => {
    fetchNotices();
  }, []);

  // Overview stats
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;

  return (
    <div className="min-h-screen flex bg-orange-100">
  {/* Sidebar */}
 <aside
  className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform 
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    transition-transform duration-300 ease-in-out md:static md:translate-x-0 z-30 flex flex-col`}
>
  {/* Header */}
  <div className="p-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
    <h2 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-sm">
      Admin Panel
    </h2>
    <p className="text-indigo-100 text-sm mt-1">Manage Hostel System</p>
  </div>

  {/* Navigation */}
  <nav className="mt-6 flex-1 overflow-y-auto">
    <ul className="flex flex-col gap-1 px-4">
      {[
        { name: "Dashboard", icon: "📊" },
        { name: "Complaints", icon: "📝" },
        { name: "Notices", icon: "📢" },
        { name: "Students", icon: "👥" },
      ].map((item, index) => (
        <li
          key={item.name}
          className={`group flex items-center gap-3 p-3 rounded-xl text-gray-700 cursor-pointer
            hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300 ease-in-out
            ${index === 0 ? "bg-indigo-50 text-indigo-700 font-semibold" : ""}`}
        >
          <span className="text-lg transition-transform transform group-hover:scale-125">
            {item.icon}
          </span>
          <span className="font-medium">{item.name}</span>
        </li>
      ))}
    </ul>
  </nav>

  {/* Footer Buttons */}
  <div className="p-4 border-t bg-gray-50 mt-auto flex flex-col items-center gap-3">
    <Link
      to="/"
      className="w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg font-medium
      shadow hover:bg-blue-600 hover:shadow-md transition-all duration-200"
    >
      Go to Home
    </Link>

    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-medium
      shadow hover:bg-red-600 hover:shadow-md transition-all duration-200"
    >
      Logout
    </button>
  </div>
</aside>


  {/* Mobile backdrop */}
  {sidebarOpen && (
    <div
      className="fixed inset-0 bg-black opacity-30 z-10"
      onClick={() => setSidebarOpen(false)}
    ></div>
  )}

  {/* Main Content */}
  <main className="flex-1 p-4 md:p-6 md:ml-0">
    {/* Header */}
    <div className="flex justify-between items-center mb-6  top-0 bg-orange-100 z-10 p-2 md:p-0 rounded-md md:rounded-none shadow-sm md:shadow-none">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Mobile menu button */}
      <button
        className="md:hidden bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            sidebarOpen ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {sidebarOpen ? "Close" : "Menu"}
      </button>
    </div>


        {/* Overview Stats */}
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

        {/* Complaints Table */}
      <div className="bg-green-100 p-6 rounded-lg shadow mb-6">
  <h2 className="text-xl font-bold mb-4 text-gray-700">Manage Complaints</h2>

  {/* Table for larger screens */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-indigo-100 text-gray-700 uppercase text-sm tracking-wider">
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Room No.</th>
          <th className="p-3 text-left">Title</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((c, index) => (
          <tr
            key={c._id}
            className={`border-b hover:bg-gray-50 transition-colors duration-200 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="p-3">{c.student?.name || "Unknown"}</td>
            <td className="p-3">{c.student?.room || "-"}-{c.student?.hostel}</td>
            <td className="p-3 font-medium text-gray-800">{c.title}</td>
            <td className="p-3">{c.category}</td>
           <td className={`p-3 font-semibold ${
              c.status === "Pending" ? "text-red-500" :
              c.status === "Resolved" ? "text-green-500" : "text-blue-500"
            }`}>
              {c.description}
            </td>
            <td className={`p-3 font-semibold ${
              c.status === "Pending" ? "text-red-500" :
              c.status === "Resolved" ? "text-green-500" : "text-blue-500"
            }`}>
              {c.status}
            </td>
            <td className="p-3">
              <select
  className="appearance-none w-full border border-gray-300 rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-50 to-white 
             text-gray-700 font-medium shadow-sm transition-all duration-300 
             hover:shadow-md hover:border-indigo-400 focus:outline-none focus:ring-2 
             focus:ring-indigo-400 focus:border-indigo-400 cursor-pointer"
  value={c.status}
  onChange={(e) => handleStatusChange(c._id, e.target.value)}
>
  <option className="bg-white text-gray-700">Pending</option>
  <option className="bg-white text-gray-700">In Progress</option>
  <option className="bg-white text-gray-700">Resolved</option>
</select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Card layout for mobile */}
  <div className="md:hidden flex flex-col gap-4">
    {complaints.map((c) => (
      <div key={c._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
        <p><span className="font-semibold">Name:</span> {c.student?.name || "Unknown"}</p>
        <p><span className="font-semibold">Room:</span> {c.student?.room || "-"}-{c.student?.hostel}</p>
        <p><span className="font-semibold">Title:</span> {c.title}</p>
        <p><span className="font-semibold">Category:</span> {c.category}</p>
        <p className="font-semibold mt-1">
          Description: <span className={`${
            c.status === "Pending" ? "text-red-500" :
            c.status === "Resolved" ? "text-green-500" : "text-blue-500"
          }`}>{c.description}</span>
        </p>
        <p className="font-semibold mt-1">
          Status: <span className={`${
            c.status === "Pending" ? "text-red-500" :
            c.status === "Resolved" ? "text-green-500" : "text-blue-500"
          }`}>{c.status}</span>
        </p>
        <select
          className="mt-2 border border-gray-300 rounded px-2 py-1 w-full bg-white hover:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={c.status}
          onChange={(e) => handleStatusChange(c._id, e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>
    ))}
  </div>
</div>



        {/* Notices */}
        <div className="bg-red-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Manage Notices</h2>

          <form className="flex gap-2 mb-4" onSubmit={handleAddNotice}>
            <input
              type="text"
              placeholder="Enter notice..."
              className="border p-2 rounded-lg flex-1"
              value={noticeInput}
              onChange={(e) => setNoticeInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add
            </button>
          </form>

          <ul className="list-disc list-inside text-red-600">
            {notices.length === 0 ? (
              <p className="text-red-400">No notices yet</p>
            ) : (
              notices.map((n) => (
                <li key={n._id}>
                  {n.description}
                  <span className="text-sm text-grey-400">
                    {" "}
                    ({new Date(n.date).toLocaleString()})
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default DashboardA;
