var lunr = require("lunr"),
    fs = require('fs-extra');

// read in the data structure
let data = fs.readFileSync("../data/products.json");
// parse the data into JSON
let documents = JSON.parse(data);

// create the lunr index
var idx = lunr(function () {
  // the ref is the unique identifier
  this.ref("product");
  // the fields are for searching
  this.field("product");
  this.field("technology")

  documents.forEach(function (doc) {
    this.add(doc);
  }, this);
});

// path for export
var file = '../data/idx.js';

// make it a js variable so it is easy to use in the code
var output = 'const idx = ' + JSON.stringify(idx) + '; export default idx';
 
// export
fs.outputFile(file, output)