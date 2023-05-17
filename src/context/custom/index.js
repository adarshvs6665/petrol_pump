// AuthContext.js
import React, { createContext, useState } from "react";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const AuthProviderDefaultValues = {
  auth: {
    authenticated: user.authenticated || false,
  },
  setAuth: () => {},
};
export const AuthContext = createContext(AuthProviderDefaultValues);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(AuthProviderDefaultValues.auth);
  const value = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
