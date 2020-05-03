import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,

  useParams,
} from "react-router-dom";
import { PageHeader, Button, Descriptions } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SurveyResults from "./SurveyResults";
export const Dashboard = () => {
  let { id } = useParams();
  const [_fetch, setFetch] = useState(true);
  const [userData, setUserData] = useState("");

  //onInit
  useEffect(() => {
    if (_fetch) {
      fetchUserData();
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

  return (
    <div>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Dashboard"
          extra={[
            <Button key="1" type="primary">
              <div>
                <PlusOutlined />
                New Survey
              </div>
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="User">
              {userData.username}
            </Descriptions.Item>
            <Descriptions.Item label="Total Survey">
              <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="Active Survey">3</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>

      <div className="dashboard-main-card ">
        <SurveyResults></SurveyResults>
      </div>
    </div>
  );
};

export default Dashboard;
