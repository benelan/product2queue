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
      data: []
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getCsvData();
  }

  fetchCsv() {
    return fetch("/data/product_queue.csv").then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder("utf-8");

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }

  async getCsvData() {
    let csvData = await this.fetchCsv();

    Papa.parse(csvData, {
      complete: this.getData,
    });
  }

  getData(result) {
    let final = [];
    const header = result.data[0];
    result.data.forEach((row, index) => {
      if (index != 0) {
        let object = {};
        object["product"] = row[0]; // Product
        let t = "";
        let q = "";
        for (let i = 1; i < 8; i++) {
          if (row[i]) {
            q += row[i];
            t += header[i];
          }
        }
        object["technology"] = t;
        object["queue"] = q;
        object["supportMethod"] = row[8];
        if (row[9] && row[9].includes("@")) {
          object["email"] = row[9];
        } else {
          object["url"] = row[9];
        }
        final.push(object);
      }
    });
    this.setState({data: final});
    this.createIndex(final);
  }

  createIndex(documents) {
    var idx = lunr(function () {
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
    return <Search index={this.state.index} data={this.state.data}/>;
  }
}

export default App;
