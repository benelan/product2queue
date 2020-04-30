import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, FormGroup, Label, Input } from "reactstrap";
import Search from "./Search";
import products from "../data/productData";
import queues from "../data/queueData";

const App = () => {
  const appStyle = {
    margin: "40px",
  };

  return (
    <Row className="justify-content-md-center" style={appStyle}>
      <Col md={{ size: 5, offset: 0 }}>
        <FormGroup>
          <Search items={products} category="Product" />
        </FormGroup>
      </Col>
      <Col md={{ size: 5, offset: 2 }}>
        <FormGroup>
          <Search items={queues} category="Queue" />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default App;
