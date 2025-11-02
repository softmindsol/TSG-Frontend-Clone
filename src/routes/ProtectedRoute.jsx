// src/routes/ProtectedRoute.jsx
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const location = useLocation();

  // ✅ Get token from localStorage
  const token = localStorage.getItem("agentToken");

  // ✅ Optionally, get role from Redux if stored
  const agent = useSelector(
    (state) => state.agent?.AgentLogin?.data?.data?.agent
  );
  const userRole = agent?.role || "agent"; // default fallback

  // ✅ 1. Check Authentication
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ 2. Role-Based Protection (optional)
  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    return <Navigate to="/no-permission" replace />;
  }

  // ✅ 3. If authenticated and authorized
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
