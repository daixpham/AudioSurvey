import React from "react";
import Body from "./components/Body";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import NavContext from "./components/NavContext"
const loginStatus = true;
class App extends React.Component {
  componentWillMount(){
    console.log("App updated");
    
  }

  changeNav(){

  }
  render() {
    
    
    return (
      <div className="">
        <Router>
          <NavContext.Provider value={loginStatus}>
            <NavBar></NavBar>
            <Body view={this.changeNav.bind(this)}></Body>
          </NavContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
