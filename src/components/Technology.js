import React from "react";
import { Input, Label, Card } from "reactstrap";

class Technology extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Label style={{marginBottom: "11px"}} for="exampleSelect">Technology</Label>
        <Card body>
          <Input
            type="select"
            name="select"
            id="technologySelect"
            onChange={this.props.onTechnologyChange}
          >
            <option value={"Any"}>Any</option>
            {this.props.techList.map((tech, i) => {
              return (
                <option key={i} value={tech}>
                  {tech}
                </option>
              );
            })}
          </Input>
        </Card>
      </React.Fragment>
    );
  }
}

export default Technology;
