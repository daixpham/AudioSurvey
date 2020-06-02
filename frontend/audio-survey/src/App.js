import React from "react";
import Body from "./components/Body";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import AuthContext from "./components/AuthContext";
class App extends React.Component {
  render() {
    return (
      <AuthContext.Provider>
        <div className="">
          <Router>
            <Body></Body>
          </Router>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
