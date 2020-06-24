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
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] });
    // set the state to the product input value
    let q = this.state.query;
    q.product = e.target.value.replace(/[^a-zA-Z ]/g, " ");
    q.buzzwords = ""; // clear buzzword search value
    this.setState({ query: q });
    this.startSearch();
  }

  handleBuzzwordsChange(e) {
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] });
    // set the state to the product input value
    let q = this.state.query;
    q.buzzwords = e.target.value.replace(/[^a-zA-Z ]/g, " ");
    q.product = ""; // clear product search value
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
      // set original results
      const or = this.state.results[0];
      // set the list of original techs
      var ort = or.technology.split(",").map((item) => item.trim());
      // set the state to the technology input value
      // if the original result includes the selected tech
      // we will narrow down the visible queues
      if (ort.includes(e.target.value)) {
        // set the temp string of queues
        // which is what will be visible
        let temp = "";
        // create the list of queues in the original results
        let orq = or.queue.split(",");
        // iterate through the queues
        orq.forEach((q) => {
          // if the queue belongs to the selected tech
          if (this.props.tech[e.target.value.replace(/\s/g, '')].includes(q.trim())) {
            // add it to the temp string
            temp += q.trim();
          }
        });
        // set the temp string to the visible results
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
    let q = ""; // init query string

    // ---- FOR PRODUCT SEARCHES  ---- \\
    if (this.state.query.product !== "") {
      // split search words
      let products = this.state.query.product.split(" ");
      // iterate through search words
      // adding them all to product field search
      products.forEach((prod) => {
        q += ` +product:*${prod}*`;
      });
      // add tech field search value
      // if selected from dropdown
      if (this.state.query.technology !== "Any") {
        q += ` +technology:${this.state.query.technology}`;
      }
      // set lunr search to query
      const f = this.props.index.search(q);
      // set the search results for the dropdown list
      this.setState({ filtered: f });
      // if there is only one result display its info
      if (f.length === 1) {
        this.findResult(f[0]);
      }

      // ---- FOR BUZZWORD SEARCHES  ---- \\
    } else if (this.state.query.buzzwords !== "") {
      // split search words
      let buzzwords = this.state.query.buzzwords.split(" ");
      // add tech field search value
      // if selected from dropdown
      if (this.state.query.technology !== "Any") {
        q += " +technology:" + this.state.query.technology;
        // iterate through the buzzwords
        // adding them to the search value
        // for the tech specified in the dropdown
        buzzwords.forEach((buzz) => {
          q += ` +b_${this.state.query.technology.replace(
            /\s/g,
            ""
          )}:*${buzz}*`;
        });
      } else {
        // if a tech isn't specified
        // iterate through the buzzwords
        // adding them to the search value
        // for all techs
        this.props.techList.forEach((t) => {
          buzzwords.forEach((buzz) => {
            q += ` b_${t.replace(/\s/g, "")}:*${buzz}*`;
          });
        });
      }
      // set lunr search to query
      const f = this.props.index.search(q);
      // set the search results for the dropdown list
      this.setState({ filtered: f });
      // if there is only one result display its info
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

    // if there is more than one queue
    if (qa.length > 1) {
      let temp = "";

      // if a technology is selected
      if (this.state.query.technology !== "Any") {
        // iterate through the queues
        qa.forEach((q) => {
          // check if the queue is in the selected technology
          if (this.props.tech[this.state.query.technology.replace(/\s/g, '')].includes(q.trim())) {
            // if it is, add it to the visible list
            temp += q.trim();
          }
        });
        qs.visibleQueue = temp;
      }

      // if we are doing a buzzword search and Technology is Any
      if (
        !!this.state.query.buzzwords &&
        this.state.query.technology === "Any"
      ) {
        let buzzTechs = new Set(); // init Set
        // iterate through all of the buzzwords
        for (const [_, tech] of Object.entries(item.matchData.metadata)) {
          // iterate through the techs that each buzzword matches
          for (const [o] of Object.entries(tech)) {
            // add the tech to the Set
            buzzTechs.add(o.substr(2)); // removing the "b_"
          }
        }

        // iterate through the queues
        qa.forEach((q) => {
          // iterate through the technologies that the buzzword matches
          buzzTechs.forEach((t) => {
            // if the queue belongs to the tech
            if (this.props.tech[t].includes(q.trim())) {
              // add it to the list
              temp += q.trim() + ", ";
            }
          });
        });
        // set the visible queues
        // removing trailing comma
        qs.visibleQueue = temp.replace(/(^[,\s]+)|([,\s]+$)/g, "");
      }
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

    const extraM = {
      marginBottom: "10px",
      marginTop: "7.35px",
    };
    return (
      <Row className="justify-content-md-center" style={appStyle}>
        <Col style={mBot} md={{ size: 5, offset: 0 }}>
          <Product
            filtered={this.state.filtered}
            onProductChange={this.handleProductChange}
            onBuzzwordsChange={this.handleBuzzwordsChange}
            onResult={this.findResult}
          />
        </Col>

        <Col style={extraM} md={{ size: 3, offset: 0 }}>
          <Technology
            onTechnologyChange={this.handleTechnologyChange}
            techList={this.props.techList}
          />
        </Col>

        <Col style={extraM} md={{ size: 4, offset: 0 }}>
          <Result results={this.state.results} />
        </Col>
      </Row>
    );
  }
}

export default Search;
