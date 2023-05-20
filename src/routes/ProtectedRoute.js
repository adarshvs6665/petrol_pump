import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "context";
// import { useContext } from "react";
// hooks
import useAuth from "hooks";

const ProtectedRoute = () => {
  const location = useLocation(); // current location
  const { auth } = useAuth();

  return auth.authenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/sign-in"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  );
};
export default ProtectedRoute;
