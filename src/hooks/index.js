import { useContext } from "react";
import { AuthContext } from "context/custom";

const useAuth = () => useContext(AuthContext);

export default useAuth;
