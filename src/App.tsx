import reactLogo from "./assets/react.svg";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/home/HeroSection";

function App() {
  Axios({
    method: "GET",
    url: "http://localhost:8080/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data.message);
  });

  return (
    <div className="App">
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default App;
