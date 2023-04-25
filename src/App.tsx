import reactLogo from "./assets/react.svg";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/home/HeroSection";
import common from "./redux/common";
import { useAppSelector } from "./redux/store/hooks";
// import FeatureSection from "./components/features/FeatureSection";
import SpotifyLogoSection from "./components/SpotifyLogoSection/SpotifyLogoSection";



function App() {
  const isLoggedIn = useAppSelector((state) => state.common.isUserLoggedIn);

  Axios({
    method: "GET",
    url: "http://localhost:8080/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data.message);
  });

  useEffect(() => {
    common.getStatus();
  }, []);

  // useEffect(() => {
  //   console.log(isLoggedIn);
  //   common.getStatus();
  // }, [isLoggedIn]);

  return (
    <div className="App">
      <HeroSection />
      <SpotifyLogoSection/>
      {/* <FeatureSection /> */}
    </div>
  );
}

export default App;
