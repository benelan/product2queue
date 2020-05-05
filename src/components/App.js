import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "reactstrap";
import Search from "./Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleResultChange = this.handleResultChange.bind(this);
    this.state = {
      result: [],
    };
  }

  componentDidMount() {
    // console.log(this.state.index.search("web"));
  }

  handleResultChange(r) {
    this.setState({ result: r });
  }

  render() {
    return (
      <Search onResultChange={this.handleResultChange}/>
    );
  }
}

export default App;
