/*global require*/
var lunr = require('lunr'),
  fs = require('fs-extra')

// read in the data structure
let data = fs.readFileSync('../data/product_tech_queue.json')
// parse the data into JSON
let documents = JSON.parse(data)

var idx = lunr(function () {
  this.pipeline.remove(lunr.stemmer)
  this.searchPipeline.remove(lunr.stemmer)
  // the ref is the unique identifier
  this.ref('product')
  // the fields are for searching
  this.field('product')
  this.field('technology')
  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})

// path for export
var file = '../data/idx.json'

var output = JSON.stringify(idx)

// export
fs.outputFile(file, output)
