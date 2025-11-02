// src/routes/AppRoutes.jsx
import Cookies from "js-cookie";
import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { publicRoutes, authRoutes, protectedRoutes } from "./routes.jsx";
import CustomLoader from "../components/common/CustomLoader.jsx";
import { PATH } from "./paths.js";

const AppRoutes = () => {
  const location = useLocation();
  const isAuth = !!Cookies.get("access_token");
  console.log("isAuth: ", isAuth);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <CustomLoader />
          </div>
        }
      >
        <Routes location={location} key={location.key}>
          {/* Public */}
          {publicRoutes.map(({ path, element }, idx) => (
            <Route key={`public-${idx}`} path={path} element={element} />
          ))}

          {/* Auth */}
          {authRoutes.map(({ path, element }, idx) => (
            <Route
              key={`auth-${idx}`}
              path={path}
              element={isAuth ? <Navigate to={PATH.agentDashboard} /> : element}
            />
          ))}

          {/* Protected */}
          {protectedRoutes.map(({ path, element, requiredRoles }, idx) => (
            <Route
              key={`protected-${idx}`}
              path={path}
              element={
                <ProtectedRoute requiredRoles={requiredRoles}>
                  {element}
                </ProtectedRoute>
              }
            />
          ))}

          {/* Fallback */}
          <Route
            path="*"
            element={
              isAuth ? (
                <Navigate to={PATH.agentDashboard} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
