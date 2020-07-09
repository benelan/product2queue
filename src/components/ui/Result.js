import React from "react";
import { Label, ListGroup, ListGroupItem } from "reactstrap";


class Result extends React.Component {
  render() {

    const linkStyle = {
      color: "#738CA6"
    }

    var geoData = "https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008f0KAAQ/view"
    var sdk = "https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008kIXAAY/view"

    return (
      <div>
        {this.props.results.length > 0 ? (
          <div>
            <Label style={{ marginBottom: "11px" }} for="res">Results</Label>
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
                  <a target="_blank" style={linkStyle} href={this.props.results[0].url}>
                    <b>Reference</b>
                  </a>
                </ListGroupItem>
              ) : (
                  ""
                )}
              {this.props.results[0].email ? (
                <ListGroupItem>
                  <b>Contact: </b>
                  <a style={linkStyle} href={`mailto:${this.props.results[0].email}`}>
                    {this.props.results[0].email}
                  </a>
                </ListGroupItem>
              ) : (
                  ""
                )}
              {this.props.results[0].visibleQueue.includes("Data") ? (
                <ListGroupItem>
                  Please review <a target="_blank" style={linkStyle} href={geoData}>this documentation</a> before transferring to Data Management.
                </ListGroupItem>
              ) : (
                  ""
                )}
              {this.props.results[0].visibleQueue.includes("SDK") ? (
                <ListGroupItem>
                  Please review <a target="_blank" style={linkStyle} href={sdk}>this documentation</a> before transferring to SDK.
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
