import React from "react";
import SurveyContext from "./SurveyContext";
import { PageHeader,Form, List } from "antd";
import Survey from "../result-survey/Survey";
import QuestionResult from "../result-survey/QuestionResult"
class Complete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="createQuestion ">
        <PageHeader
          ghost={false}
          title={"Survey Name: " + this.context.surveyname}
        ></PageHeader>
        <Form>
        <List
          size="large"
          itemLayout="horizontal"
          className="p-3"
          grid={{ gutter: 16, column: 1 }}
          dataSource={this.context.questions}
          renderItem={(item) => (
            <List.Item>
              <QuestionResult
                checkedDisable={true}
                radioDisable={true}
                question={item}
              ></QuestionResult>
            </List.Item>
          )}
        />
        </Form>
      </div>
    );
  }
}
Complete.contextType = SurveyContext;
export default Complete;
