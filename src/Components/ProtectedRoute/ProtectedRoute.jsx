import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  if (localStorage.getItem("id") && localStorage.getItem("token")) {
    dispatch(authActions.login());
  } else if (isLoggedIn === false) {
    navigate("/login");
  }
  if (!isLoggedIn) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (the protected route component)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
