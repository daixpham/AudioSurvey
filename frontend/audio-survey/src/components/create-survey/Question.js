import React from "react";
import { Button, Modal, Input, Form, Divider, Tag } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import SurveyContext from "./SurveyContext";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AudioModalVisible: false,
      AnswerModalVisible: false,
      answerButtonVisible: false,
      answerOptions: [],
    };
  }

  componentDidMount(){
    this.props.handler();
  }

  showAddAudioModal = () => {
    this.setState({
      AudioModalVisible: true,
    });
  };

  showAddAnswerModal = () => {
    this.setState({
      AnswerModalVisible: true,
    });
  };

  getAudioList() {
    let list = [];
    this.context.questions[this.props.number].audios.forEach((element, i) => {
      list.push(<Tag key={i}>{element.name}</Tag>);
    });
    return <div>{list}</div>;
  }

  getAnswerOptions() {
    let answersOptions = [];
    let optionsLength = this.state.answerOptions.length;
    for (let index = 0; index < optionsLength; index++) {
      answersOptions.push(
        <Tag key={index}>{this.state.answerOptions[index].answerText}</Tag>
      );
    }
    return <div>{answersOptions}</div>;
  }

  audioOnFinish = (value) => {
    let audio = {
      name: value.audioname,
      url: value.url,
      answers: this.state.answerOptions,
    };
    this.context.questions[this.props.number].audios.push(audio);
    this.setState({ AudioModalVisible: false, answerButtonVisible: true });
    
    console.log(this.context);
  };

  answerOnFinish = (value) => {
    let list = [];
    let answer = {
      answerText: value.option,
      checked: 0,
    };
    let audioLength = this.context.questions[this.props.number].audios.length;

    list.push(answer);
    this.setState({ AnswerModalVisible: false });
    this.setState({
      answerOptions: this.state.answerOptions.concat(list),
    });
    for (let index = 0; index < audioLength; index++) {
      this.context.questions[this.props.number].audios[
        index
      ].answers = this.state.answerOptions;
    }

    console.log(this.state.answerOptions);

    console.log(this.context);
  };

  handleAudioCancel = (e) => {
    console.log(e);
    this.setState({
      AudioModalVisible: false,
    });
  };
  handleAnswerCancel = (e) => {
    console.log(e);
    this.setState({
      AnswerModalVisible: false,
    });
  };
  render() {
    return (
      <div className="my-3">
        <h5>{this.props.question}</h5>
        <div className="p-3 float-right">
          <Button onClick={() => this.showAddAudioModal()}>
            <UploadOutlined /> Add Audio
          </Button>
        </div>
        {this.state.answerButtonVisible ? (
          <div className="p-3 float-right">
            <Button onClick={() => this.showAddAnswerModal()}>
              <PlusOutlined /> Add Answer Options
            </Button>
          </div>
        ) : null}
        <div className="float-left text-left">
          <div className="float-both p-3">Audios:{this.getAudioList()}</div>
          <div className="float-both p-3">
            Answers options:{this.getAnswerOptions()}
          </div>
        </div>

        <Modal
          key={0}
          title="Add Question"
          visible={this.state.AudioModalVisible}
          onCancel={this.handleAudioCancel}
          footer={null}
        >
          <Form {...layout} onFinish={this.audioOnFinish}>
            <Form.Item label="Name" name="audioname">
              <Input />
            </Form.Item>
            <Form.Item label="Url" name="url">
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          key={1}
          title="Add Answer options"
          visible={this.state.AnswerModalVisible}
          onCancel={this.handleAnswerCancel}
          footer={null}
        >
          <Form {...layout} onFinish={this.answerOnFinish}>
            <Form.Item label="Name" name="option">
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Divider />
      </div>
    );
  }
}
Question.contextType = SurveyContext;
export default Question;
