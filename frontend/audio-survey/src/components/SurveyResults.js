import React from "react";
import { Cascader } from "antd";

class SurveyResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: this.props.data,
      selectedSurvey: [],
      selected: false,
      questions: null,
    };
  }

  onChange(value, data) {
    this.setState({ selectedSurvey: data[0].survey });
    this.setState({ selected: true });
    this.setState({
      questions:  data[0].survey.map((question, i) => (
        <QuestionResult key={i} question={question}/>
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
    };
    const options = [];

    this.state.surveys.forEach((element) => {
      item.value = element.surveyname;
      item.label = element.surveyname;
      item.survey = element.questions;

      options.push(item);

      item = {
        value: null,
        label: null,
        survey: null,
      };
    });

   console.log(this.state.questions);
   

    return (
      <div className="container-fluid">
        <Cascader
          options={options}
          onChange={this.onChange.bind(this)}
          changeOnSelect
        />
        <div>{this.state.selected ? this.state.questions : null}</div>
      </div>
    );
  }
}

class QuestionResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: this.props.question, headers: null };
  }

  

  render() {
    
    return (
      <div className="container-fluid">
       <p>{this.props.question.questionText}</p>
      </div>
    );
  }
}
export default SurveyResults;
