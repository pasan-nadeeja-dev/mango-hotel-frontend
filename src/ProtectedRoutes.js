import { Navigate } from "react-router-dom";

const useAuth = () => {
  // check for authenticated user
  const user = window.localStorage.getItem("MANGO.loggedUser");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  return auth ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
