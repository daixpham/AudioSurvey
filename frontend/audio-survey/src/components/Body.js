import React from "react";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";
import CreateSurvey from "./CreateSurvey";
import Survey from "./result-survey/Survey";
import NavBar from "./Navbar";

function Body() {
  return (
    <div className="">
      <Switch>
        <Route exact path="/">
          <NavBar loginStatus={false}></NavBar>
          <Home />
        </Route>
        <Route path="/signup">
          <NavBar loginStatus={false}></NavBar>
          <SignUp />
        </Route>
        <Route path="/login">
          <NavBar loginStatus={false}></NavBar>
          <Login />
        </Route>
        <Route path="/dashboard/:id" component={Dashboard} />
        <Route path="/createsurvey/:id" component={CreateSurvey} />
        <Route path="/:id/:surveyname" component={Survey} />
      </Switch>
    </div>
  );
}

export default Body;
