import React from "react";
import { PageHeader, Button, Descriptions, Result } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SurveyResults from "./SurveyResults";
import Cookies from "universal-cookie";
import NavBar from "./Navbar";
import AuthContext from "./AuthContext";
import { Link } from "react-router-dom";

const cookies = new Cookies();

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      surveysLength: 0,
      authContext: null,
      authToken: null,
      userId: this.props.match.params.id,
    };
  }

  //onInit
  componentDidMount() {
    
    fetch("https://localhost:5001/api/users/" + this.state.userId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ authContext: AuthContext._currentValue });
        console.log(data);
        this.setState({ userData: data, authToken:data.authToken });
      })
      .catch((error) => console.log(error));
  }

  createNewSurvey() {
    this.props.history.push("/createsurvey/" + this.state.userId);
  }

  render() {
    if (this.state.userData === null) {
      return null;
    }
    let authToken = cookies.get("authToken",{path: "/"});
    
    
    if (this.state.authToken != authToken) {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary"><Link to="/login">Back Home</Link></Button>}
        />
      );
    }

    return (
      <div>
        <NavBar loginStatus={true}></NavBar>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Dashboard"
            extra={[
              <Button
                key="1"
                onClick={() => this.createNewSurvey()}
                type="primary"
              >
                <div>
                  <PlusOutlined />
                  New Survey
                </div>
              </Button>,
            ]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="User">
                {this.state.userData.username}
              </Descriptions.Item>
              <Descriptions.Item label="Total Survey">
                <a>{this.state.userData.surveys.length}</a>
              </Descriptions.Item>
              <Descriptions.Item label="Active Survey">3</Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>

        <div className="dashboard-main-card ">
          <SurveyResults
            userId={this.state.userId}
            data={this.state.userData.surveys}
          ></SurveyResults>
        </div>
      </div>
    );
  }
}

Dashboard.contextType = AuthContext;
export default Dashboard;
