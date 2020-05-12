import React from "react";
import SurveyContext from "./SurveyContext";
import { PageHeader, List, Card, Modal, Form, Tag } from "antd";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

class Complete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.context);

    return (
      <div className="createQuestion">
        <PageHeader
          ghost={false}
          title={"Survey Name: " + this.context.surveyname}
        ></PageHeader>
        <List
          itemLayout="horizontal"
          className="p-3"
          grid={{ gutter: 16, column: 1 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
Complete.contextType = SurveyContext;
export default Complete;
