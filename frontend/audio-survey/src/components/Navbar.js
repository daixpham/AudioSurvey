import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginStatus: this.props.loginStatus};
  }
 


  render() {
    
    return (
      <div className="">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img
              src="/graphic_eq-24px.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            ></img>
            <span className="logo-header">AudioSurvey</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <HomeOutlined />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            {!this.state.loginStatus ? (
              <ul className="navbar-nav float-right mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <div className="nav-link" href="#">
                    <Link to="/login">Login</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" href="#">
                    <Link to="/signup">SignUp</Link>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav float-right mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <div className="nav-link" href="#">
                    <Link  to="/">Logout</Link>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
