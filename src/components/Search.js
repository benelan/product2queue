import React from "react";
import { Row, Col, Input, Label, ListGroup, ListGroupItem } from "reactstrap";
import lunr from "lunr";
import idx from "../data/idx.json";
import prod from "../data/product_tech_queue.json";
import tech from "../data/tech_queue.json";

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
        technology: "Any",
      },
      results: [],
    };
  }

  handleProductChange(e) {
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] });
    // set the state to the product input value
    let q = this.state.query;
    q.product = e.target.value;
    this.setState({ query: q });
    this.startSearch();
  }

  handleTechnologyChange(e) {
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] });
    let q = this.state.query;
    q.technology = e.target.value;
    // set the state to the technology input value
    this.setState({ query: q });
    // start the search
    this.startSearch();
  }

  startSearch = () => {
    if (this.state.query.product !== "") {
      // * wildcard means anything can be
      // before or behind the search value
      // ie *at* would include 'attack', 'fat', 'matter', etc
      let q = "+product:*" + this.state.query.product + "*";
      // + means it must contain the value
      if (this.state.query.technology !== "Any") {
        q += " +technology:" + this.state.query.technology;
      }
      const f = this.state.index.search(q);
      this.setState({ filtered: f });
      if (f.length === 1) {
        this.findResult(f[0]);
      }
    }
  };

  findResult = (item) => {
    // match the index ref to the full data struct to get all of the info
    let qs = prod.find((res) => item.ref === res.product);
    // create an array of queues
    const qa = qs.queue.split(",");
    let newQS = JSON.parse(JSON.stringify(qs)) // don't ask, don't remove

    if (this.state.query.technology !== "Any" && qa.length > 1) {
      let temp = "";
      qa.forEach((q) => {
        if (tech[0][this.state.query.technology].includes(q.trim())) {
          temp += q.trim();
        }
      });
      newQS.queue = temp;
    }

    // set the state to the result info
    this.setState({ results: [newQS] });
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
                onClick={() => this.findResult(item)}
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
              <Label for="res">Results</Label>
              <ListGroup>
                <ListGroupItem>
                  <b>Queue:</b> {this.state.results[0].queue}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Support Method:</b> {this.state.results[0].supportMethod}
                </ListGroupItem>
                {this.state.results[0].reference !== "" ? (
                  <ListGroupItem>
                    <a href={this.state.results[0].reference}>
                      <b>Reference</b>
                    </a>
                  </ListGroupItem>
                ) : (
                  ""
                )}
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
