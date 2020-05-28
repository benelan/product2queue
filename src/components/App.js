import React from "react";
import Papa from "papaparse";
import lunr from "lunr";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./Search";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      prod: [],
      tech: {},
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getCsvData();
  }

  async getCsvData() {
    // fetch the csv
    let csvData = await this.fetchCsv();

    // parse the csv
    Papa.parse(csvData, {
      complete: this.getData, // run getData function on completion
    });
  }

  // fetches and decodes and then returns the csv data
  fetchCsv() {
    return fetch("/data/product_queue.csv").then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder("utf-8");

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }

  getData(result) {
    let prod = []; // final json of products
    let tech = {}; // final json of tech to queue
    const header = result.data[0]; // the header of the csv
    for (let i = 1; i < 8; i++) {
      // iterate through the technologies
      // init the json of technologies to queues
      tech[header[i]] = [];
    }

    // iterate through the rows
    result.data.forEach((row, index) => {
      if (index != 0) {
        // if the row is not the header
        let object = {}; // init the product object
        object["product"] = row[0]; // set the product to the value
        let t = ""; // init tech string
        let q = ""; // init queue string
        for (let i = 1; i < 8; i++) {
          // iterate through the technologies
          if (row[i]) {
            // if the queue isn't blank
            q += row[i] + ", "; // add the queue to the product's list
            t += header[i] + ", "; // add the tech to the product's list
            if (!tech[header[i]].includes(row[i])) {
              // if the queue hasn't already been added to the tech object
              tech[header[i]].push(row[i]); // add it
            }
          }
        }
        // regex strips trailing comma from the queue and tech strings
        const strippedT = t.replace(/(^[,\s]+)|([,\s]+$)/g, "");
        const strippedQ = q.replace(/(^[,\s]+)|([,\s]+$)/g, "");
        // set the queue, tech, and support method values
        object["technology"] = strippedT;
        object["queue"] = strippedQ;
        object["supportMethod"] = row[8];
        // if there is a reference and it is an email address
        if (row[9] && row[9].includes("@")) {
          // set it to the value of email
          object["email"] = row[9];
        } else {
          // otherwise set it to the value of url
          object["url"] = row[9];
        }
        prod.push(object); // add the prod object to the array of products
      }
    });
    // after creating the jsons set them to state
    this.setState({ prod: prod });
    this.setState({ tech: tech });
    // create the lunr index
    this.createIndex(prod);
  }

  // creates the lunr index
  createIndex(documents) {
    var idx = lunr(function () {
      //stemming causes issues when doing wildcard searches
      this.pipeline.remove(lunr.stemmer);
      this.searchPipeline.remove(lunr.stemmer);
      // the ref is the unique identifier
      this.ref("product");
      // the fields are for searching
      this.field("product");
      this.field("technology");
      documents.forEach(function (doc) {
        this.add(doc);
      }, this);
    });

    this.setState({ index: idx });
  }
  render() {
    return (
      <Search
        index={this.state.index}
        prod={this.state.prod}
        tech={this.state.tech}
      />
    );
  }
}

export default App;
