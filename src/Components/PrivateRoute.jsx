// PrivateRoute.jsx
import { Navigate } from "react-router";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // no token → go to login
    return <Navigate to={role === "admin" ? "/alogin" : "/login"} />;
  }

  if (role && userRole !== role) {
    // role mismatch → block access
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

