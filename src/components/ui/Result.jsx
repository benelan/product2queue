import React from 'react'
import PropTypes from 'prop-types'
import { Label, ListGroup, ListGroupItem } from 'reactstrap'

class Result extends React.PureComponent {
  render() {
    const linkStyle = {
      color: '#738CA6',
    }

    const geoData = 'https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008f0KAAQ/view'
    const sdk = 'https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008kIXAAY/view'

    const { results } = this.props
    return (
      <>
        {results.length > 0 ? (
          <div>
            <Label style={{ marginBottom: '11px' }} for="res">Results</Label>
            <ListGroup>
              <ListGroupItem>
                <b>Product:</b>
                {' '}
                {results[0].product}
              </ListGroupItem>
              <ListGroupItem>
                <b>Queue:</b>
                {' '}
                {results[0].visibleQueue}
              </ListGroupItem>
              <ListGroupItem>
                <b>Support Method:</b>
                {' '}
                {results[0].supportMethod}
              </ListGroupItem>
              {results[0].url ? (
                <ListGroupItem>
                  <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={results[0].url}>
                    <b>Reference</b>
                  </a>
                </ListGroupItem>
              ) : (
                ''
              )}
              {results[0].email ? (
                <ListGroupItem>
                  <b>Contact: </b>
                  <a style={linkStyle} href={`mailto:${results[0].email}`}>
                    {results[0].email}
                  </a>
                </ListGroupItem>
              ) : (
                ''
              )}
              {results[0].visibleQueue.includes('Data') ? (
                <ListGroupItem>
                  Please review
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={geoData}>this documentation</a>
                  {' '}
                  before transferring to Data Management.
                </ListGroupItem>
              ) : (
                ''
              )}
              {results[0].visibleQueue.includes('SDK') ? (
                <ListGroupItem>
                  Please review
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={sdk}>this documentation</a>
                  {' '}
                  before transferring to SDK.
                </ListGroupItem>
              ) : (
                ''
              )}
            </ListGroup>
          </div>
        ) : (
          ''
        )}
      </>
    )
  }
}

Result.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
}

export default Result
