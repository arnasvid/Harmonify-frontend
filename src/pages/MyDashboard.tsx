import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MyDashboard = () => {
  const isUserLoggedIn = localStorage.getItem("token");
  return (
    <div>
      {isUserLoggedIn ? (
        <div>
          <Navbar />
          <h1>My Dashboard</h1>
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </div>
  );
};

export default MyDashboard;
