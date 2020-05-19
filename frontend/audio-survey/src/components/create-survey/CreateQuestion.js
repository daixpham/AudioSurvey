import React from "react";
import { PageHeader, Button, Modal, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Question from "./Question";
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
class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, questions: [], input:null };
  }

  componentDidMount() {
    this.props.handler();
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      modalVisible: false,
    });
  };

  onFinish = (value) => {
    let question = {
      questionText: value.question,
      audios: [],
    };
    this.context.questions.push(question);
    this.setState({
      questions: this.context.questions.map((question, i) => (
        <Question
          key={i}
          number={i}
          question={question.questionText}
          handler={this.props.handler}
        ></Question>
      )),
    });
    this.setState({ modalVisible: false });
    this.props.handler();
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
                New Question
              </div>
            </Button>,
          ]}
        ></PageHeader>
        <div>{this.state.questions}</div>
        <Modal
          title="Add Question"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...layout} onFinish={this.onFinish}>
            <Form.Item label="Question" name="question">
              <Input/>
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

CreateQuestion.contextType = SurveyContext;
export default CreateQuestion;
