import React, { useState, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import AuthContext from "./AuthContext";
import { Spin } from "antd";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Login() {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  let routeHistory = useHistory();
  let loginData = {
    username: "",
    password: "",
  };

  // call when Send button pressed
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    //Get form data
    const data = new FormData(event.target);
    loginData.username = data.get("username");
    loginData.password = data.get("password");

    let authResponse = await fetch("https://localhost:5001/api/users/auth", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        if (value === "") {
          setAlert(true);
          setLoading(false);
        } else {
          //go to Dashboard Page
          fetch("https://localhost:5001/api/users/authToken/" + value)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              cookies.set("authToken", data, { path: "/" });
            })
            .catch((error) => console.log(error));
          AuthContext._currentValue = true;
          routeHistory.push("/dashboard/" + value);
        }
      })
      .catch((error) => console.log("Unable to Auth", error));
  }

  function getAuthToken() {
    console.log(userId);
  }

  return (
    <div className="container">
      <div className="vertical-center card rounded-top">
        <h1 className="p-3 text-center">Login</h1>
        {alert ? <AlertDiv text="Username or Password is incorrect !" /> : null}
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block px-3">
            {loading ? (
              <span className="px-3">
                <Spin size="large"></Spin>
              </span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function AlertDiv(props) {
  return (
    <div className="alert alert-danger m-3 " role="alert">
      {props.text}
    </div>
  );
}
