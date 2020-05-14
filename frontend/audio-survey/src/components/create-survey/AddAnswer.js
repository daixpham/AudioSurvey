import React from "react";
import { PageHeader, Button, Input, Modal, Form, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SurveyContext from "./SurveyContext";

const layout = {
  labelCol: {
    span: 6,
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
let list = [];
let key = 0;
class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, answerList: [] };
  }
  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  onFinish = (value) => {
    let answer = {
      answerText: value.option,
      checked: 0,
    };
    // add Key to Tag 
    if (key === 0) {
      list.push(
        <Tag key={0} color="blue">
          {value.option}
        </Tag>
      );
      key = key + 1;
    } else {
      key = key + 1;
      list.push(
        <Tag key={key} color="blue">
          {value.option}
        </Tag>
      );
    }

    this.setState({ answerList: list });
    let questionLength = this.context.questions.length;
    let audioLength = 0;

    for (let i = 0; i < questionLength; i++) {
      audioLength = this.context.questions[i].audios.length;
      for (let y = 0; y < audioLength; y++) {
        this.context.questions[i].audios[y].answers.push(answer);
      }
    }
    this.setState({ modalVisible: false });
    console.log(this.context);
  };

  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    return (
      <div className="createQuestion">
        <PageHeader
          ghost={false}
          title={"Survey Name: " + this.context.surveyname}
          extra={[
            <Button key="1" onClick={() => this.showModal()} type="primary">
              <div>
                <PlusOutlined />
                New Answer options
              </div>
            </Button>,
          ]}
        ></PageHeader>
        <div className="p-3">{this.state.answerList}</div>
        <Modal
          title="Add Answer"
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...layout} onFinish={this.onFinish}>
            <Form.Item label="Answer Option" name="option">
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
AddAnswer.contextType = SurveyContext;
export default AddAnswer;
