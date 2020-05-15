import React from "react";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";
import CreateSurvey from "./CreateSurvey";
import Survey from "./result-survey/Survey";
function Body() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard/:id"  component={Dashboard}/>
        <Route path="/createsurvey/:id" component={CreateSurvey}/>
        <Route path="/:id/:surveyname" component={Survey}/>
      </Switch>
    </div>
  );
}



export default Body;
