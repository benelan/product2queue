import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "reactstrap";
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
          <Search items={products} category="Product" />
      </Col>
      <Col md={{ size: 5, offset: 2 }}>
          <Search items={queues} category="Queue" />
      </Col>
    </Row>
  );
};

export default App;
