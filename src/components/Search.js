import React from "react";
import { Row, Col, Input, ListGroup, ListGroupItem } from "reactstrap";
import lunr from "lunr";
import idx from "../data/index";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.state = {
      index: lunr.Index.load(idx),
      filtered: [],
      query: {
        product: "",
        technology: "",
      },
      results: [],
    };
  }

  componentDidMount() {
    console.log(this.state.index.search("JavaScript"));
  }

  handleProductChange(e) {
    this.setState({ filtered: [] });
    let q = this.state.query;
    q.product = e.target.value;
    this.setState({ query: q });
    if (e.target.value != "") {
      this.startSearch();
    }
  }

  startSearch = () => {
    let string = "*" + this.state.query.product + "*";
    let r = this.state.index.search(string);
    let temp = [];
    r.forEach((i) => {
      temp.push(i.ref);
    });
    this.setState({ filtered: temp });
  };

  render() {
    const appStyle = {
      margin: "40px",
    };
    return (
      <Row className="justify-content-md-center" style={appStyle}>
        <Col md={{ size: 5, offset: 0 }}>
          <Input
            type="search"
            name="search"
            className="input"
            id="searchInput"
            onChange={this.handleProductChange}
            placeholder="Search by Product"
          />

          <ListGroup>
            {this.state.filtered.map((item, index) => (
              <ListGroupItem key={index}
                //onClick={() => this.startSearch(item)}
                tag="button"
                action
              >
                {item}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={{ size: 5, offset: 2 }}></Col>
      </Row>
    );
  }
}

export default Search;
