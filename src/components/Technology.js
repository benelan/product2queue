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
             {this.props.techList.map((tech, i) => {
              return <option key={i} value={tech}>{tech}</option>
            })}
          </Input>
        </div>
    );
  }
}

export default Technology;
