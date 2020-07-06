import React from "react";
import { Input, Label, Card } from "reactstrap";
import Select from "react-select";

class Technology extends React.Component {
  render() {
    const colourStyles = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "#F7F9FA",
        cursor: "pointer",
        boxShadow: "none",
        minHeight: "40px",
        height: "40px",
      }),
      menu: (base) => ({
        ...base,
        marginTop: "21.5px",
        left: "-19.5px",
        width: "113%",
        minHeight: "fit-content",
        minWidth: "fit-content",
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isFocused ? "whitesmoke" : "white",
          ":active": {
            ...styles[":active"],
            backgroundColor: "lightgrey",
          },
          color: "black",
          cursor: "pointer",
          minHeight: "fit-content",
          minWidth: "fit-content",
          paddingTop: "6px",
          paddingBottom: "6px",
          fontSize: "16px",
        };
      },
    };

    let items = this.props.techList.map((tech, i) => {
      return { target: { value: tech }, label: tech };
    });

    items.unshift({ target: { value: "Any" }, label: "Any" });

    return (
      <React.Fragment>
        <Label style={{ marginBottom: "11px" }} for="exampleSelect">
          Technology
        </Label>
        <Card style={{ height: "82px" }} body>
          <Select
            defaultValue={items[0]}
            label="Select Technology"
            options={items}
            styles={colourStyles}
            onChange={(selectedOption) =>
              this.props.onTechnologyChange(selectedOption)
            }
          />
          {/* <Input
            type="select"
            name="select"
            id="technologySelect"
            style={{height:"40px", background: "#F7F9FA", cursor: "pointer"}}
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
          </Input> */}
        </Card>
      </React.Fragment>
    );
  }
}

export default Technology;
