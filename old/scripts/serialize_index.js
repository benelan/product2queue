const lunr = require('lunr')
// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs-extra')

// read in the data structure
const data = fs.readFileSync('../data/product_tech_queue.json')
// parse the data into JSON
const documents = JSON.parse(data)

const idx = lunr(() => {
  this.pipeline.remove(lunr.stemmer)
  this.searchPipeline.remove(lunr.stemmer)
  // the ref is the unique identifier
  this.ref('product')
  // the fields are for searching
  this.field('product')
  this.field('technology')
  documents.forEach((doc) => {
    this.add(doc)
  }, this)
})

// path for export
const file = '../data/idx.json'

const output = JSON.stringify(idx)

// export
fs.outputFile(file, output)
