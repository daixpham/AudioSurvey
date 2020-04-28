import React, { useState, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  let users = null;
  let userID = null;
  const [alert, setAlert] = useState(false);
  let routeHistory = useHistory();
  // call when Send button pressed
  async function handleSubmit(event) {
    event.preventDefault();

    let signUpData = {
      username: "",
      password: "",
    };

    //Get form data
    const data = new FormData(event.target);
    signUpData.username = data.get("username");
    signUpData.password = data.get("password");

    console.log(signUpData);

    axios
      .post("https://localhost:5001/api/users", { signUpData })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //fetch data
    // fetch("https://localhost:5001/api/users", {
    //   method: "POST",
    //   headers: {
    //     'Accept': "*/*",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: JSON.stringify(signUpData),
    // })
    //   .then((response) => response.json)
    //   .catch((error) => console.log("Unable to add User", error));

    console.log(users);
  }

  return (
    <div className="container">
      <div className="vertical-center card rounded-top">
        <h1 className="p-3 text-center">SignUp</h1>

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
