import React, { useState } from "react";
import Body from "./components/Body";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'antd/dist/antd.css';
function App() {
  return (
    <div className="">
      <Router>
        <NavBar></NavBar>
        <Body></Body>
      </Router>
    </div>
  );
}

export default App;
