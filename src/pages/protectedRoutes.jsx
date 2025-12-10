import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token'); 
  const navigate = useNavigate();
  if (!isLoggedIn) {
    return navigate("/login")
  }
  return children;
};

export default ProtectedRoute;
