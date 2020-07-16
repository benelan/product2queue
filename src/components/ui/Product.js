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
  Card,
  Button
} from "reactstrap";
import classnames from "classnames";
import VirtualScroll from "./VirtualScroll";

class Product extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.inputProd = React.createRef();

  }

  state = {
    activeTab: "1", // the active tab for mobile phones
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  clear = () => {
    console.log("calling the clear() function...");
    this.inputProd.value = "";
    setTimeout(() => {     
      console.log(this.inputProd);
      console.log(this.inputProd.value);
    }, 2000);

  }


  render() {
    const lgi = {
      height: "70px",
      color: "black",
      fontSize: "16px"
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
          style={{ color: "#ADC5CC", border: "transparent" }}>
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
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Card style={{ height: "82px" }} body>
              <Input
                ref={this.inputProd}
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
            <Card style={{ height: "82px" }} body>
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
        </TabContent>
        <Button outline color="secondary" size="md" block
          // onClick={() => this.clearSearch()}
          onClick={this.clear}
        >Clear</Button>

        <ListGroup>
          <VirtualScroll
            itemCount={this.props.filtered.length}
            height={300}
            childHeight={70}
            Item={Item}
          />
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Product;
