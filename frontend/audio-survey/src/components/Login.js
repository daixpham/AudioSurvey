import React, { useState, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

export default function Login() {
  let users = null;
  let userID = null;
  const [alert,setAlert] = useState(false)
  let routeHistory = useHistory();
  // call when Send button pressed
  async function handleSubmit(event) {
    event.preventDefault();

    let loginData = {
      username: "",
      password: "",
    };

    //Get form data
    const data = new FormData(event.target);
    loginData.username = data.get("username");
    loginData.password = data.get("password");
    console.log(JSON.stringify(loginData));
    //fetch data
    let loginResponse =  await fetch("https://localhost:5001/api/users");
    users = await loginResponse.json();

    userID = getLoginResult(loginData);

    if (userID === null) {
      setAlert(true)
    } else {
      console.log(userID);
      //go to new Page
      routeHistory.push("/dashboard/"+userID);
    }
  }

  function getLoginResult(loginData) {
    let result = null;
    for (let index = 0; index < users.length; index++) {
      if (
        loginData.username === users[index].username &&
        loginData.password === users[index].password
      ) {
        result = users[index].id;
      }
    }
    return result;
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
            Send
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
