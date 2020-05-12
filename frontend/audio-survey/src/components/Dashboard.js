import React from "react";
import { PageHeader, Button, Descriptions } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SurveyResults from "./SurveyResults";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      surveysLength: 0,
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
        this.setState({ userData: data });
        console.log(this.state.userData);
      })
      .catch((error) => console.log(error));
  }

  createNewSurvey() {
    // const id = this.props.match.params.id;
    this.props.history.push("/createsurvey/" + this.state.userId);
    // routeHistory.push("/createsurvey/" + id);
  }

  render() {
    if (this.state.userData === null) {
      return null;
    }

    return (
      <div>
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
            <SurveyResults data={this.state.userData.surveys}></SurveyResults>
          </div>
    
      </div>
    );
  }
}

export default Dashboard;
