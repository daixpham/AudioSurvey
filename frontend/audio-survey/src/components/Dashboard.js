import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

export const Dashboard = () => {
  let { id } = useParams();
  const [_fetch, setFetch] = useState(true)
  const [userData, setUserData] = useState("");

  //onInit
  useEffect(() => {
      if(_fetch){
        fetchUserData();
      }

    return function cleanup(){
        setFetch(false)
    }
  }, [userData]);

  async function fetchUserData() {
    let loginResponse = await fetch("https://localhost:5001/api/users/" + id);
    let data = await loginResponse.json();
    setUserData(data);
  }

  return <div>{userData.username}</div>;
};

export default Dashboard;
