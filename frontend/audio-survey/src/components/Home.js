import React from "react";
import NavContext from "./NavContext";
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      console.log(this.context);
      
  }
  render() {
    this.context = true
    return <div>Home</div>;
  }
}
Home.contextType = NavContext;
export default Home;
