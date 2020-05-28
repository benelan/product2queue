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
      tech: {}
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
    let prod = []; // final json of products
    let tech = {}; // final json of tech to queue
    const header = result.data[0]; // the header of the csv
    for (let i = 1; i < 8; i++) { // init the json of technologies to queues
      tech[header[i]] = [];
    }
    result.data.forEach((row, index) => {
      if (index != 0) {
        let object = {};
        object["product"] = row[0];
        let t = "";
        let q = "";
        for (let i = 1; i < 8; i++) {
          if (row[i]) {
            q += row[i] + ", ";
            t += header[i]  + ", ";
            if (!tech[header[i]].includes(row[i])) {
              tech[header[i]].push(row[i]);
            }
          }
        }
        // regex strips trailing comma
        const strippedT = t.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        const strippedQ =  q.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        object["technology"] = strippedT;
        object["queue"] = strippedQ;
        object["supportMethod"] = row[8];
        if (row[9] && row[9].includes("@")) {
          object["email"] = row[9];
        } else {
          object["url"] = row[9];
        }
        prod.push(object);
      }
    });
    this.setState({prod: prod});
    this.setState({tech: tech});
    this.createIndex(prod);
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
    return <Search index={this.state.index} prod={this.state.prod} tech={this.state.tech}/>;
  }
}

export default App;
