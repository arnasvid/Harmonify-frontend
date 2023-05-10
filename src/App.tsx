import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import common from "./redux/common";
import { useAppSelector } from "./redux/store/hooks";
import { BrowserRouter as Router, Route, Routes, RouteObject } from "react-router-dom";
import routes from "./routes/routes";
import RouteItem from "./models/routes/RouteItem";

function App() {
  // const isLoggedIn = useAppSelector((state) => state.common.isUserLoggedIn);

  useEffect(() => {
    common.getStatus();
  }, []);

  // useEffect(() => {
  //   console.log(isLoggedIn);
  //   common.getStatus();
  // }, [isLoggedIn]);

  return (
    <div className="App">
      <Routes>
      {routes.map((route : RouteItem) => (
        <Route path={route.path} key={route.key} element={route.element} />
      ))}
      </Routes>
    </div>
  );
}

export default App;
