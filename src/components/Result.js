import React from "react";
import { Label, ListGroup, ListGroupItem } from "reactstrap";


class Result extends React.Component {
  render() {
    return (
      <div>
        {this.props.results.length > 0 ? (
          <div>
            <Label style={{marginBottom: "11px"}} for="res">Results</Label>
            <ListGroup>
              <ListGroupItem>
                <b>Product:</b> {this.props.results[0].product}
              </ListGroupItem>
              <ListGroupItem>
                <b>Queue:</b> {this.props.results[0].visibleQueue}
              </ListGroupItem>
              <ListGroupItem>
                <b>Support Method:</b> {this.props.results[0].supportMethod}
              </ListGroupItem>
              {this.props.results[0].url ? (
                <ListGroupItem>
                  <a href={this.props.results[0].url}>
                    <b>Reference</b>
                  </a>
                </ListGroupItem>
              ) : (
                ""
              )}
              {this.props.results[0].email ? (
                <ListGroupItem>
                  <b>Contact: </b>
                  <a href={`mailto:${this.props.results[0].email}`}>
                    {this.props.results[0].email}
                  </a>
                </ListGroupItem>
              ) : (
                ""
              )}
            </ListGroup>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Result;
