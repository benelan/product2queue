var lunr = require("lunr"),
    fs = require('fs-extra');

let data = fs.readFileSync("../data/mock.json");
let documents = JSON.parse(data);

var idx = lunr(function () {
  this.ref("product");
  this.field("product");
  this.field("queue");

  documents.forEach(function (doc) {
    this.add(doc);
  }, this);
});
var file = '../data/index.js';

var output = 'const idx = ' + JSON.stringify(idx) + '; export default idx';

fs.outputFile(file, output)