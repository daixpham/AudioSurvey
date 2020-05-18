import React from "react";
import NavContext from "./NavContext";
class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    this.context = true
    return <div>Home</div>;
  }
}
Home.contextType = NavContext;
export default Home;
