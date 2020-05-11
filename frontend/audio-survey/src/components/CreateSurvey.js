import React from "react";
import {
  PageHeader,
  Steps,
  Button,
  message,
  Modal,
  Input,
  Form,
  Tooltip,
  Divider,
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const { Step } = Steps;

let Survey = {
  surveyname: "",
  questions: [],
};

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

const steps = [
  {
    title: "Set Name",
    content: "Name",
  },
  {
    title: "Add Questions",
    content: "Questions",
  },
  {
    title: "Add Answer",
    content: "Answer",
  },
  {
    title: "Complete",
    content: "Test",
  },
];

class CreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: null,
      value: 1,
      nextButtonDisable: true,
    };

    this.handler = this.handler.bind(this);
  }

  componentWillMount() {
    steps[0].content = <SetName key={0} handler={this.handler}></SetName>;
    steps[1].content = <CreateQuestion key={1}></CreateQuestion>;
    steps[2].content = <AddAnswer key={2}></AddAnswer>;
    steps[3].content = <Complete key={3}></Complete>;
  }

  handler() {
    if (Survey.surveyname === "") {
      this.setState({ nextButtonDisable: true });
    } else {
      this.setState({ nextButtonDisable: false });
    }
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Create New Survey"
          ></PageHeader>
        </div>
        <div className="dashboard-main-card ">
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button
                disabled={this.state.nextButtonDisable}
                type="primary"
                onClick={() => this.next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

class SetName extends React.Component {
  constructor(props) {
    super(props);
  }

  setName(evt) {
    Survey.surveyname = evt.target.value;
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
              placeholder={Survey.surveyname}
            />
          </div>
        </div>
      </div>
    );
  }
}

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, questions: [] };
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  onFinish = (value) => {
    let question = {
      questiontext: value.question,
      audios: [],
      answers: [],
    };
    Survey.questions.push(question);
    this.setState({
      questions: Survey.questions.map((question, i) => (
        <Question key={i} question={question.questiontext}></Question>
      )),
    });
    this.setState({ modalVisible: false });
    console.log(Survey);
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };
  render() {
    return (
      <div className="createQuestion">
        <PageHeader
          ghost={false}
          title={"Survey Name: " + Survey.surveyname}
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

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="createQuestion">
        <PageHeader
          ghost={false}
          extra={[
            <Button
              key="1"
              onClick={() => this.createNewSurvey()}
              type="primary"
            >
              <div>
                <PlusOutlined />
                New Answer options
              </div>
            </Button>,
          ]}
        ></PageHeader>
        <div>
          <TextArea
            placeholder="Autosize height based on content lines"
            autoSize
          />
        </div>
      </div>
    );
  }
}

class Complete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="createQuestion"> Complete</div>;
  }
}

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">
        <div className="p-3">
          <p>{this.props.question}</p>
          <Tooltip className="float-right" title="Add Audio">
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <UploadOutlined /> Click to upload
              </Button>
            </Upload>
          </Tooltip>
        </div>
        <Divider />
      </div>
    );
  }
}
export default CreateSurvey;
