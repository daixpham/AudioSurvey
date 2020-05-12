import React from "react";
import { Button, Modal, Input, Form, Divider, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
    this.state = { modalVisible: false };
  }
  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  getAudioList() {
    let list = [];
    this.context.questions[this.props.number].audios.forEach((element,i) => {
      list.push(<Tag key={i}>{element.name}</Tag>);
    });
    return <div>{list}</div>;
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  onFinish = (value) => {
    let audio = {
      name: value.audioname,
      url: value.url,
      answers:[]
    };
    this.context.questions[this.props.number].audios.push(audio);
    this.setState({ modalVisible: false });
    console.log(this.context);
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };
  render() {
    return (
      <div className="">
        <p>{this.props.question}</p>
        <div className="p-3 float-right">
          <Button onClick={() => this.showModal()}>
            <UploadOutlined /> Add Audio
          </Button>
        </div>
        <div className="float-left p-3">Audios:{this.getAudioList()}</div>
        <Modal
          title="Add Question"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...layout} onFinish={this.onFinish}>
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
        <Divider />
      </div>
    );
  }
}
Question.contextType = SurveyContext;
export default Question;
