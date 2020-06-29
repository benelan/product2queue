import React, { memo } from "react";
import {
  Input,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card
} from "reactstrap";
import classnames from "classnames";
import VirtualScroll from "./VirtualScroll";

class Product extends React.Component {
  state = {
    activeTab: "1", // the active tab for mobile phones
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  render() {
    const lgi = {
      height: "70px",
    };

    const navlinkStyle = {
      cursor: "pointer"
    }

    const inputStyle = {
      height: "40px",
      background: "#F7F9FA"
    };



    const Item = memo(({ index }) => (
      <ListGroupItem
        key={index}
        style={lgi}
        onClick={() => this.props.onResult(this.props.filtered[index])}
        tag="button"
        action
      >
        {this.props.filtered[index].ref}
      </ListGroupItem>
    ));

    return (
      <React.Fragment>
        <Nav tabs
          style={{ color: "#ADC5CC" }}>
          <NavItem>
            <NavLink
              style={navlinkStyle}
              className={classnames({
                active: this.state.activeTab === "1",
              })}
              onClick={() => {
                const val = {
                  target: {
                    value: "",
                  },
                };
                this.props.onProductChange(val);
                document.getElementById("productInput").value = "";
                this.toggle("1");
              }}
            >
              Product
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={navlinkStyle}
              className={classnames({
                active: this.state.activeTab === "2",
              })}
              onClick={() => {
                const val = {
                  target: {
                    value: "",
                  },
                };
                this.props.onBuzzwordsChange(val);
                document.getElementById("buzzwordsInput").value = "";
                this.toggle("2");
              }}
            >
              Buzzwords
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "3",
              })}
              style={navlinkStyle}
              onClick={() => {
                this.toggle("3");
              }}>About</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Card body>
              <Input
                type="search"
                name="searchProduct"
                className="input"
                id="productInput"
                style={inputStyle}
                onChange={this.props.onProductChange}
                placeholder="Search by Product"
              />
            </Card>
          </TabPane>
          <TabPane tabId="2">
            <Card body>
              <Input
                type="search"
                name="searchBuzzwords"
                className="input"
                id="buzzwordsInput"
                style={inputStyle}
                onChange={this.props.onBuzzwordsChange}
                placeholder="Search by Buzzwords"
              />
            </Card>
          </TabPane>
          <TabPane tabId="3">
            <Card body>
              <label>This app was created for Esri Support Services to help employees determine which team supports each product. </label>
            </Card>
          </TabPane>
        </TabContent>

        <ListGroup>
          <VirtualScroll
            itemCount={this.props.filtered.length}
            height={400}
            childHeight={70}
            Item={Item}
          />
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Product;
