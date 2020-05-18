import React from "react";
import { Input } from "antd";
import SurveyContext from "./SurveyContext";

class SetName extends React.Component {
  setName(evt) {
    this.context.surveyname = evt.target.value;
    this.props.handler();
  }
  render() {
    return (
      <div className="createQuestion">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-10 p-3 ">
            <label htmlFor="surveyName">
              <h4>Survey Name</h4>
            </label>
            <Input
              id="surveyName"
              allowClear={true}
              onChange={(evt) => this.setName(evt)}
              placeholder={this.context.surveyname}
            />
          </div>
        </div>
      </div>
    );
  }
}
SetName.contextType = SurveyContext;
export default SetName;
