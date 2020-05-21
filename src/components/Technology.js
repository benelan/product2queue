import React from "react";
import { Input, Label } from "reactstrap";


class Technology extends React.Component {
  render() {
    return (
      <div>
          <Label for="exampleSelect">Technology</Label>
          <Input
            type="select"
            name="select"
            id="technologySelect"
            onChange={this.props.onTechnologyChange}
          >
            <option value={"Any"}>Any</option>
            <option value={"Data"}>Data Management</option>
            <option value={"Desktop"}>Desktop</option>
            <option value={"Enterprise"}>Enterprise</option>
            <option value={"Implementation"}>Implementation</option>
            <option value={"Online"}>Online</option>
            <option value={"Professional Services"}>
              Professional Services
            </option>
            <option value={"SDK"}>SDK</option>
          </Input>
        </div>
    );
  }
}

export default Technology;
