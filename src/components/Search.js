import React from "react";
import { Row, Col, Input, Label, ListGroup, ListGroupItem } from "reactstrap";
import lunr from "lunr";
import idx from "../data/idx";
import data from "../data/products.json";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleTechnologyChange = this.handleTechnologyChange.bind(this);
    this.state = {
      index: lunr.Index.load(idx), // create the index from the serialized json
      filtered: [],
      query: {
        product: "",
        technology: "",
      },
      results: [],
    };
  }

  componentDidMount() {}

  handleProductChange(e) {
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] });
    // set the state to the product input value
    let q = this.state.query;
    q.product = e.target.value;
    this.setState({ query: q });
    // if the input isn't blank
    if (e.target.value !== "") {
      // start the search
      this.startSearch();
    }
  }

  handleTechnologyChange(e) {
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] });
    let q = this.state.query;
    q.technology = e.target.value;
    // if a technology is selected and there are inputs in the product search
    if (e.target.value !== "Any" && q.product !== "") {
      // set the state to the technology input value
      this.setState({ query: q });
      // start the search
      this.startSearch();
    }
  }

  startSearch = () => {
    // * wildcard means anything can be
    // before or behind the search value
    // ie *at* would include 'attack', 'fat', 'matter', etc
    let pQ = "product:*" + this.state.query.product + "*";
    // + means it must contain the value
    //let tQ = " technology:+" + this.state.query.technology;
    let q = pQ; //+ tQ;
    let f = this.state.index.search(q);
    this.setState({ filtered: f });
  };

  matchQueue = (item) => {
    // match the index ref to the full data struct to get all of the info
    const result = data.find((post) => item.ref === post.product);
    // set the state to the result info
    this.setState({ results: [result] });
  };

  render() {
    const appStyle = {
      margin: "40px",
    };
    return (
      <Row className="justify-content-md-center" style={appStyle}>
        <Col md={{ size: 3, offset: 0 }}>
          <Label for="exampleSelect">Technology</Label>
          <Input
            type="select"
            name="select"
            id="technologySelect"
            onChange={this.handleTechnologyChange}
          >
            <option value={"Any"}>Any</option>
            <option value={"Data Management"}>Data Management</option>
            <option value={"Desktop"}>Desktop</option>
            <option value={"Enterprise"}>Enterprise</option>
            <option value={"Implementation"}>Implementation</option>
            <option value={"Online"}>Online</option>
            <option value={"Professional Services"}>
              Professional Services
            </option>
            <option value={"SDK<"}>SDK</option>
          </Input>
        </Col>

        <Col md={{ size: 5, offset: 0 }}>
          <Label for="productInput">Product</Label>
          <Input
            type="search"
            name="search"
            className="input"
            id="productInput"
            onChange={this.handleProductChange}
            placeholder="Search by Product"
          />

          <ListGroup>
            {this.state.filtered.map((item, index) => (
              <ListGroupItem
                key={index}
                onClick={() => this.matchQueue(item)}
                tag="button"
                action
              >
                {item.ref}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={{ size: 4, offset: 0 }}>
          {this.state.results.length > 0 ? (
            <div>
              <Label for="results">Results</Label>
              <ListGroup>
                <ListGroupItem>
                  <b>Queue:</b> {this.state.results[0].queue}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Support Method:</b> {this.state.results[0].supportMethod}
                </ListGroupItem>
              </ListGroup>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
    );
  }
}

export default Search;
