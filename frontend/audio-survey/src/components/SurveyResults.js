import React from "react";
import { Cascader, Popover, Button, Form, Statistic } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import QuestionResult from "./result-survey/QuestionResult";
class SurveyResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: this.props.data,
      selectedSurvey: [],
      interviewed: 0,
      selected: false,
      questions: null,
      surveyName: "",
      linkToSurvey: "",
    };
  }

  onChange(value, data) {
    if (data[0] === undefined) {
      return null;
    }
    this.setState({
      selectedSurvey: data[0].survey,
      selected: true,
      interviewed: data[0].interviewed,
      surveyName:value,
      linkToSurvey:"http://localhost:3000/"+this.props.userId+"/"+value
    });
    

    this.setState({
      questions: data[0].survey.map((question, i) => (
        <QuestionResult radioDisable={true} key={i} question={question} />
      )),
    });
  }

  render() {
    if (this.props.data === null) {
      return null;
    }
    //fill DropDown options
    let item = {
      value: null,
      label: null,
      survey: null,
      interviewed: null,
    };
    const options = [];

    this.state.surveys.forEach((element) => {
      item.value = element.surveyname;
      item.label = element.surveyname;
      item.survey = element.questions;
      item.interviewed = element.interviewed;
      options.push(item);

      item = {
        value: null,
        label: null,
        survey: null,
        interviewed: null,
      };
    });

    return (
      <div className="container-fluid">
        <Cascader
          options={options}
          onChange={this.onChange.bind(this)}
          changeOnSelect
        />
        <div>
          <Form>
            {this.state.selected ? (
              <div>
                <div className="row m-3">
                  <Statistic
                    className="col-6"
                    title="Number of participants"
                    value={this.state.interviewed}
                  ></Statistic>
                  <div className="col-6 text-right">
                    <Popover
                      placement="top"
                      title={this.state.surveyName}
                      content={this.state.linkToSurvey}
                      trigger="click"
                    >
                      <Button><ShareAltOutlined />Link to Survey</Button>
                    </Popover>
                  </div>
                </div>
                {this.state.questions}
              </div>
            ) : null}
          </Form>
        </div>
      </div>
    );
  }
}

export default SurveyResults;
