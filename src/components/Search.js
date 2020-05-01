import React from "react";
import { Input,  InputGroup, InputGroupAddon, ListGroup, ListGroupItem, Button } from "reactstrap";
import productSearch from "../data/productSearch";
import queueSearch from "../data/queueSearch";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      result: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     filtered: this.props.items,
  //   });
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     filtered: nextProps.items,
  //   });
  // }

  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.props.items;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter((item) => {
        // change current item to lowercase
        const lc = item.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = [];
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
      result: []
    });
  }

  startSearch = (item) => {
    if (this.props.category == "Product") {
      this.searchProduct(item);
    } else {
      this.searchQueue(item);
    }
  };

  searchProduct = (item) => {
    this.setState({result: [productSearch[item]] })
  };

  searchQueue = (item) => {
    this.setState({result: queueSearch[item] })
  };

  render() {
    const ph = "Search by " + this.props.category;
    return (
      <React.Fragment>
        <Input
           type="search"
           name="search"
          className="input"
          id="searchInput"
          onChange={this.handleChange}
          placeholder={ph}
        />

        <ListGroup>
          {this.state.filtered.map((item) => (
            <ListGroupItem onClick={() => this.startSearch(item)} tag="button" action>
              {item}
            </ListGroupItem>
          ))}
        </ListGroup>
          
        <ListGroup style={{marginTop: "50px"}}>
          {this.state.result.map((item) => (
            <ListGroupItem color="success">
              {item}
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Search;
