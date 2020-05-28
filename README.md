

# Product to Queue

This app was created for Esri Support Services to help employees determine which team supports each product.

## Using the App

To run the web app locally for development, you must have [Node](https://nodejs.org/en/) installed. With Node installed, navigate to the project directory and type:
```
npm install
npm start
```
To build this app for deployment, type:
```
npm run build
```

## Changing the Data
This application reads directly from a [spreadsheet](https://github.com/benelan/product2queue/blob/master/public/data/product_queue.csv). The spreadsheet must be a csv file named 'product_queue'.

### Data that can be edited without changes to code
- The value of any cell
	- Changing the name of a Technology/Unit
	- Changing which queue a product belongs in
	- changing the reference, etc
  
### Data that requires changes to code after editing
- Adding new columns,  such as buzzwords
- Removing columns
- Changing the order of columns. For the app to work without changing code, the column order must be
	- product first
	- reference last
	- support method second to last
	- the order of the technologies/units can change, but need to be columns 1-7 (count starting at 0)

## Reporting Issues
Issues with the application can be reported to Ben Elan or Lingtao Xie. If the spreadsheet needs to be edited in a way that requires changes to the code, feel free to reach out to us as well. We would be happy to help get the application working with the necessary changes.

## Built With
*  [React](https://reactjs.org/) - Frontend Framework
*  [Reactstrap](https://reactstrap.github.io/) - Bootstrap for React
*  [Lunr](https://lunrjs.com/) - Search Engine
*  [PapaParse](https://www.papaparse.com) - CSV Parser
