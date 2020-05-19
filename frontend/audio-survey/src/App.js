import React from "react";
import Body from "./components/Body";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
const loginStatus = true;
class App extends React.Component {

  render() {
    return (
      <div className="">
        <Router>
          <Body></Body>
        </Router>
      </div>
    );
  }
}

export default App;
