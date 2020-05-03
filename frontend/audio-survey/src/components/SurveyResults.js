import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Cascader } from "antd";
import { DownOutlined } from "@ant-design/icons";

export const SurveyResults = () => {
  let { id } = useParams();
  const [_fetch, setFetch] = useState(true);
  const [userData, setUserData] = useState("");
  const suvreys = []
  const item = {
    value:null,
    label:null
  }
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
    },
  ];
  //onInit
  useEffect(() => {
    if (_fetch) {
      fetchUserData();
      // get Surveys from User
      userData.surveys.forEach(element => {
        
      });
    }

    // componentWillUnmount
    return function cleanup() {
      setFetch(false);
    };
  }, [userData]);

  async function fetchUserData() {
    let loginResponse = await fetch("https://localhost:5001/api/users/" + id);
    let data = await loginResponse.json();
    setUserData(data);
  }

  function onChange(value) {
    console.log(value);
  }

  return (
    <div className="container-fluid">
      <Cascader options={options} onChange={onChange} changeOnSelect />
    </div>
  );
};

export default SurveyResults;
