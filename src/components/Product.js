import React, { memo } from "react";
import { Input, Label, ListGroup, ListGroupItem } from "reactstrap";
import VirtualScroll from "./VirtualScroll";

class Product extends React.Component {
  render() {
    const lgi = {
      height: "70px",
    };
    const Item = memo(({ index }) => (
      <ListGroupItem
        key={index}
        style={lgi}
        onClick={() => this.props.onResult(this.props.filtered[index])}
        tag="button"
        action
      >
        {this.props.filtered[index].ref}
      </ListGroupItem>
    ));


    return (
        <div>
          <Label for="productInput">Product</Label>
          <Input
            type="search"
            name="search"
            className="input"
            id="productInput"
            onChange={this.props.onProductChange}
            placeholder="Search by Product"
          />

          <ListGroup>
            <VirtualScroll
              itemCount={this.props.filtered.length}
              height={400}
              childHeight={70}
              Item={Item}
            />
          </ListGroup>
        </div>
    );
  }
}

export default Product;