import React from "react";
import { Affix, Form, Button, PageHeader, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import QuestionResult from "./QuestionResult";
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      survey: null,
      siteNotFound: false,
      surveyDone: false,
    };
  }

  componentDidMount() {
    fetch("https://localhost:5001/api/users/" + this.state.userId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let _survey = data.surveys.find(
          (element) => element.surveyname === this.props.match.params.surveyname
        );
        if (_survey === undefined) {
          this.setState({ siteNotFound: true });
          return null;
        }
        this.setState({ survey: _survey });
      })
      .catch((error) => {
        this.setState({ siteNotFound: true });
      });
  }

  getQuestions() {
    let questions = null;
    questions = this.state.survey.questions.map((question, i) => (
      <QuestionResult
        radioDisable={false}
        checkedDisable={true}
        key={i}
        question={question}
      ></QuestionResult>
    ));
    return questions;
  }

  onFinish(value) {
    let result = {
      audioName: null,
      answer: null,
    };
    let surveyResult = {
      surveyName: this.state.survey.surveyname,
      results: [],
    };
    let answers = Object.entries(value);
    for (let index = 0; index < answers.length; index++) {
      result.audioName = answers[index][0];
      result.answer = answers[index][1];
      surveyResult.results.push(result);
      result = {
        audioName: null,
        answer: null,
      };
    }

    fetch(
      "https://localhost:5001/api/users/" +
        this.state.userId +
        "/surveyResultUpdate",
      {
        method: "PUT",
        mode: "cors",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyResult),
      }
    )
      .then((response) => {
        this.setState({ surveyDone: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.survey === null || this.state.siteNotFound) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
      );
    }

    return (
      <div className="container-fluid ">
        {!this.state.surveyDone ? (
          <div>
            <div className="site-page-header-ghost-wrapper">
              <PageHeader
                ghost={false}
                title={"Survey: " + this.state.survey.surveyname}
              ></PageHeader>
            </div>
            <Form onFinish={(value) => this.onFinish(value)}>
              {this.getQuestions()}
              <div className="row justify-content-center" offsetBottom={5}>
                <Form.Item className="survey-footer col-lg-2 col-md-4 col-sm-8 box-shadow">
                  <Button
                    shape="round"
                    type="primary"
                    block
                    size="large"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        ) : (
          <Result
            icon={<SmileOutlined />}
            title="Great, we have done all the operations!"
            extra={<Button type="primary">Bye!</Button>}
          />
        )}
      </div>
    );
  }
}
export default Survey;
