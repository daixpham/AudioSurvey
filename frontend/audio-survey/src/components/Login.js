import React, { useState, Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.users = null;
    this.userID = null;
    this.state = { alert: false };
  }

  async handleSubmit(event) {
    event.preventDefault();
    let loginData = {
      username: "",
      password: "",
    };
    const [loginStatus,setLoginStatus] = useState(null);
    const data = new FormData(event.target);
    let alertDiv;
    loginData.username = data.get("username");
    loginData.password = data.get("password");
    console.log(JSON.stringify(loginData));
    let loginResponse = await fetch("https://localhost:5001/api/users");
    this.users = await loginResponse.json();

    this.userID = this.checkLogin(loginData);

    if (this.userID === null) {
      this.state.alert = true;
      console.log(this.state.alert);
    } else {
      console.log(this.userID);
    }
  }

  checkLogin(loginData) {
    let result = null;
    for (let index = 0; index < this.users.length; index++) {
      if (
        loginData.username === this.users[index].username &&
        loginData.password === this.users[index].password
      ) {
        result = this.users[index].id;
      }
    }
    return result;
  }

  render() {
    console.log(this.state.alert);
    let alertDiv;
    if (this.state.alert) {
      alertDiv = <AlertDiv text="login fail"> </AlertDiv>;
    }else{
      alertDiv = <AlertDiv text="login succes"> </AlertDiv>;
    }

    return (
      <div className="container">
        <div className="vertical-center card rounded-top">
          <h1 className="p-3">Login</h1>

          {alertDiv}
          <form className="p-3" onSubmit={this.handleSubmit}>
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
            <button type="submit" className="btn btn-primary btn-block px-1">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function AlertDiv(props) {
  return (
    <div className="alert alert-danger" role="alert">
      {props.text}
    </div>
  );
}
export default Login;
