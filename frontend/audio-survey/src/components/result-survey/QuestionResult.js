import React from "react";
import { List, Form, Card, Radio } from "antd";
import { PlaySquareOutlined } from "@ant-design/icons";

class QuestionResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: this.props.question, headers: null };
  }
  getAnswerAsRadio(answerList) {
    let radioList = [];
    answerList.forEach((element, i) => {
      radioList.push(
        <div key={i}>
          <Radio value={element.answerText}>{element.answerText}</Radio>
          <div>
            {!this.props.checkedDisable ? (
              <div>Checked: {element.checked}</div>
            ) : null}
          </div>
        </div>
      );
    });

    return radioList;
  }
  getAudioList(audioList) {
    let list = [];
    audioList.forEach((element, i) => {
      list.push(
        <Form.Item key={i} name={element.name}>
          <Card
            title={
              <div className="row ">
                <div className="col-lg-2 col-sm-12 my-3">
                  <PlaySquareOutlined className="p-1" />
                  {element.name}
                </div>
                <div className="col-lg-6 col-sm-12 audio-player align-self-start">
                  <audio  controls>
                    <source src={element.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            }
          >
            <Radio.Group disabled={this.props.radioDisable}>
              {this.getAnswerAsRadio(element.answers)}
            </Radio.Group>
          </Card>
        </Form.Item>

        // <List
        //   key={i}
        //   size="small"
        //   itemLayout="horizontal"
        //   className="m-3"
        //   grid={{ gutter: 16, column: 1 }}
        //   header={
        //     <div>
        //
        //       {element.name}
        //     </div>
        //   }

        //   bordered
        //   dataSource={element.answers}
        //   renderItem={(item) => (
        //     <List.Item>
        //       <Form.Item name="radio-group" label="Radio.Group">
        //         <Radio value={1} disabled={this.props.radioDisable}>
        //           {item.answerText}
        //         </Radio>
        //
        //       </Form.Item>
        //     </List.Item>
        //   )}
        // />
      );
    });
    return list;
  }

  render() {
    return (
      <div>
        <Card
          className="text-left font-weight-bold m-3 box-shadow"
          title={this.props.question.questionText}
        >
          {this.getAudioList(this.props.question.audios)}
        </Card>
      </div>
    );
  }
}

export default QuestionResult;
