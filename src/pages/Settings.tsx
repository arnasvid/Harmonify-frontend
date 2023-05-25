import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/Footer";
import ProfileSettings from "../components/profileSettings/ProfileSettings";
import { useAppSelector } from "../redux/store/hooks";

const Settings = () => {
  const isUserLoggedIn = localStorage.getItem("token");

  return (
    <div>
      {isUserLoggedIn ? (
        <div>
          <Navbar />
          <ProfileSettings />
          <Footer />
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </div>
  );
};

export default Settings;
