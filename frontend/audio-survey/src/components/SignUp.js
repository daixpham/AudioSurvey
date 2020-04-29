import React, { useState, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { Spin } from "antd";
export default function SignUp() {
  let routeHistory = useHistory();
  const [loading, setLoading] = useState(false);
  // call when Send button pressed
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let signUpData = {
      username: "",
      password: "",
    };

    //Get form data
    const data = new FormData(event.target);
    signUpData.username = data.get("username");
    signUpData.password = data.get("password");

    let testData = new FormData();
    testData.append("json", JSON.stringify(signUpData));

    let signUpResponse = await fetch("https://localhost:5001/api/users", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    })
      .then((response) => {
        setTimeout(() => {
          // go to Login 
          routeHistory.push("/login");
        }, 2000);
      })
      .catch((error) => console.log("Unable to add User", error));
  }

  return (
    <div className="container">
     
      <div className="vertical-center card rounded-top">
        <h1 className="p-3 text-center">SignUp</h1>

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
             {loading ?  <span className="px-3"><Spin  size="large"></Spin></span> : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
