import React from "react";
import { PageHeader, Steps, Button, message, Popconfirm } from "antd";
import SetName from "./create-survey/SetName";
import SurveyContext from "./create-survey/SurveyContext";
import CreateQuestion from "./create-survey/CreateQuestion";
import AddAnswer from "./create-survey/AddAnswer";
import Complete from "./create-survey/Complete";

const { Step } = Steps;
let Survey = {
  surveyname: "",
  questions: [],
};

const steps = [
  {
    title: "Set Name",
    content: "Name",
  },
  {
    title: "Add Questions",
    content: "Questions",
  },
  {
    title: "Complete",
    content: "Check",
  },
];

class CreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: null,
      value: 1,
      nextButtonDisable: true,
      userId: this.props.match.params.id,
    };

    this.handler = this.handler.bind(this);
  }

  componentWillMount() {
    steps[0].content = <SetName key={0} handler={this.handler}></SetName>;
    steps[1].content = <CreateQuestion handler={this.handler} key={1}></CreateQuestion>;
    // steps[2].content = <AddAnswer key={2}></AddAnswer>;
    steps[2].content = <Complete key={2}></Complete>;
  }

  handler() {
    console.log(this.state.current);

    if (Survey.surveyname === "" || this.state.current === 0) {
      this.setState({ nextButtonDisable: true });
    } else {
      this.setState({ nextButtonDisable: false });
    }

    if (Survey.questions.length <= 0 && this.state.current === 1) {
      this.setState({ nextButtonDisable: true });
    } else {
      this.setState({ nextButtonDisable: false });
    }

    console.log("call");
    
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  cancel() {
    Survey = { surveyname: "", questions: [] };
    this.props.history.push("/dashboard/" + this.state.userId);
  }

  uploadSurvey() {
    fetch(
      "https://localhost:5001/api/users/" + this.state.userId + "/surveyUpdate",
      {
        method: "PUT",
        mode: "cors",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Survey),
      }
    )
      .then((response) => {
        setTimeout(() => {
          Survey = {
            surveyname: "",
            questions: [],
          };
          // go to Dashboard
          this.props.history.push("/dashboard/" + this.state.userId);
        }, 1000);
      })
      .catch((error) => console.log("Unable to add Survey", error));

    console.log(Survey);
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <SurveyContext.Provider value={Survey}>
          <div className="site-page-header-ghost-wrapper">
            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title="Create New Survey"
            ></PageHeader>
          </div>
          <div className="dashboard-main-card col-md-10 offset-md-1 ">
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button
                  disabled={this.state.nextButtonDisable}
                  type="primary"
                  onClick={() => this.next()}
                >
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => this.uploadSurvey()}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
              <Popconfirm
                className="float-right"
                placement="top"
                title="Are you sure ?"
                onConfirm={() => this.cancel()}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Cancel</Button>
              </Popconfirm>
            </div>
          </div>
        </SurveyContext.Provider>
      </div>
    );
  }
}

export default CreateSurvey;
