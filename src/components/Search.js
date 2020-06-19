import React from "react";
import { Row, Col } from "reactstrap";
import Product from "./Product";
import Technology from "./Technology";
import Result from "./Result";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleBuzzwordsChange = this.handleBuzzwordsChange.bind(this);
    this.handleTechnologyChange = this.handleTechnologyChange.bind(this);
    this.state = {
      filtered: [],
      query: {
        product: "",
        technology: "Any",
        buzzwords: "",
      },
      results: [],
    };
  }

  handleProductChange(e) {
    console.log(2)
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] });
    // set the state to the product input value
    let q = this.state.query;
    q.product = e.target.value;
    q.buzzwords = "";
    this.setState({ query: q });
    this.startSearch();
  }

  handleBuzzwordsChange(e) {
    console.log(1)
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] });
    // set the state to the product input value
    let q = this.state.query;
    q.buzzwords = e.target.value;
    q.product = "";
    this.setState({ query: q });
    this.startSearch();
  }

  handleTechnologyChange(e) {
    let q = this.state.query;
    q.technology = e.target.value;
    this.setState({ query: q });
    // the section below is for changing the queue/tech in the results
    // when the technology dropdown is changed
    if (this.state.results.length > 0) {
      const or = this.state.results[0];
      var ort = or.technology.split(",").map((item) => item.trim());
      // set the state to the technology input value

      if (ort.includes(e.target.value)) {
        let temp = "";
        let orq = or.queue.split(",");
        orq.forEach((q) => {
          if (this.props.tech[e.target.value].includes(q.trim())) {
            temp += q.trim();
          }
        });
        or.visibleQueue = temp;

        this.setState({ results: [or] });
      } else {
        // clear the dropdown and results
        this.setState({ filtered: [], results: [] });
        // start the search
      }
    } else {
      // clear the dropdown and results
      this.setState({ filtered: [], results: [] });
      // start the search
    }
    this.startSearch();
  }

  startSearch = () => {
    // * wildcard means anything can be
    // before or behind the search value
    // ie *at* would include 'attack', 'fat', 'matter', etc
    // + means it must contain the value
    console.log(this.state.query)
    let q = "";
    if (this.state.query.product !== "") {
      q += "+product:*" + this.state.query.product + "*";
      if (this.state.query.technology !== "Any") {
        q += " +technology:" + this.state.query.technology;
      }
      const f = this.props.index.search(q);
      this.setState({ filtered: f });
      if (f.length === 1) {
        this.findResult(f[0]);
      }
    } else if (this.state.query.buzzwords !== "") {
      if (this.state.query.technology !== "Any") {
        q += ` +b_${this.state.query.technology.replace(/\s/g, "")}:*${this.state.query.buzzwords}*`;
        q += " +technology:" + this.state.query.technology;
      } else {
        this.props.techList.forEach((t) => {
          q += ` b_${t.replace(/\s/g, "")}:*${this.state.query.buzzwords}*`;
        });
      }
      console.log(q)
      const f = this.props.index.search(q);
      this.setState({ filtered: f });
      if (f.length === 1) {
        this.findResult(f[0]);
      }
    }
  };

  findResult = (item) => {
    // match the index ref to the full data struct to get all of the info
    let qs = this.props.prod.find((res) => item.ref === res.product);
    // create an array of queues
    const qa = qs.queue.split(",").map((item) => item.trim());
    // create a seperate list of queues that will be visible in the results
    qs.visibleQueue = qs.queue;
    if (this.state.query.technology !== "Any" && qa.length > 1) {
      let temp = "";
      qa.forEach((q) => {
        if (this.props.tech[this.state.query.technology].includes(q.trim())) {
          temp += q.trim();
        }
      });
      qs.visibleQueue = temp;
    }

    // set the state to the result info
    this.setState({ results: [qs] });
  };

  render() {
    const mBot = {
      marginBottom: "10px",
    };

    const appStyle = {
      margin: "20px",
    };

    return (
      <Row className="justify-content-md-center" style={appStyle}>
        <Col style={mBot} md={{ size: 3, offset: 0 }}>
          <Technology
            onTechnologyChange={this.handleTechnologyChange}
            techList={this.props.techList}
          />
        </Col>

        <Col style={mBot} md={{ size: 5, offset: 0 }}>
          <Product
            filtered={this.state.filtered}
            onProductChange={this.handleProductChange}
            onBuzzwordsChange={this.handleBuzzwordsChange}
            onResult={this.findResult}
          />
        </Col>
        <Col style={mBot} md={{ size: 4, offset: 0 }}>
          <Result results={this.state.results} />
        </Col>
      </Row>
    );
  }
}

export default Search;
