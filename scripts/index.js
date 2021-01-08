const csv = require('csv-parser')
const fs = require('fs')

const buzzwords = [];
const products = [];
const output = []

const getTech = (letter) => {
  switch (letter) {
    case 'B':
      return 'Online';
    case 'C':
      return 'Desktop';
    case 'D':
      return 'Enterprise';
    case 'E':
      return 'SDK';
    case 'F':
      return 'Data Management';
    case 'G':
      return 'Implementation'
    default:
      return 'Professional Services';
  }
}

fs.createReadStream('product_import.csv')
  .pipe(csv())
  .on('data', (p) => products.push(p))
  .on('end', () => {
    fs.createReadStream('buzzword_import.csv')
      .pipe(csv())
      .on('data', (b) => buzzwords.push(b))
      .on('end', () => {
        buzzwords.forEach((buzz) => {
          const b = Object.values(buzz)
          var n = b[0].lastIndexOf('$');
          var line = parseInt(b[0].substring(n + 1))-2;
          if (line > 0) {
          let prod = Object.values(products[line])
          let tech = getTech(b[0].slice(1, 2))
          output.push(`${prod[0]} - ${tech},${b[1]}`)
          }
        })
        output.unshift('Product - Technology,Buzzwords')

        var file = fs.createWriteStream('buzzword_export.csv');
        file.on('error', function (err) { console.log(err) });
        output.forEach(function (v) { file.write(v.concat(', ') + '\n'); });
        file.end();
      });
  });