import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "context";
// import { useContext } from "react";

const ProtectedRoute = () => {
  const location = useLocation(); // current location

  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  return userLogged ? (
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
