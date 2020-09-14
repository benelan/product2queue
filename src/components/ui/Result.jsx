import React from 'react'
import PropTypes from 'prop-types'
import { Label, ListGroup, ListGroupItem } from 'reactstrap'

/**
 * Displays selected product information
 * @author Ben Elan & Lingtao Xie
 * @parent Search
 */
class Result extends React.PureComponent {
  render() {
    // hyperlink color
    const linkStyle = {
      color: '#738CA6',
    }

    // URLs for transfer resources
    const geoData = 'https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008f0KAAQ/view'
    const sdk = 'https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008kIXAAY/view'

    const { results } = this.props
    return (
      <>
        { // if there are results, display them
          results.length > 0 ? (
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

                { // display reference url if there is one
                  results[0].url ? (
                    <ListGroupItem>
                      <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={results[0].url}>
                        <b>Reference</b>
                      </a>
                    </ListGroupItem>
                  ) : (
                    ''
                  )
                }
                { // display email if there is one
                  results[0].email ? (
                    <ListGroupItem>
                      <b>Contact: </b>
                      <a style={linkStyle} href={`mailto:${results[0].email}`}>
                        {results[0].email}
                      </a>
                    </ListGroupItem>
                  ) : (
                    ''
                  )
                }
                { // display data transfer resource if the data queue in results
                  results[0].visibleQueue.includes('Data') ? (
                    <ListGroupItem>
                      Please review
                      {' '}
                      <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={geoData}>this documentation</a>
                      {' '}
                      before transferring to Data Management.
                    </ListGroupItem>
                  ) : (
                    ''
                  )
                }
                { // display sdk transfer resource if the sdk queue in results
                  results[0].visibleQueue.includes('SDK') ? (
                    <ListGroupItem>
                      Please review
                      {' '}
                      <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={sdk}>this documentation</a>
                      {' '}
                      before transferring to SDK.
                    </ListGroupItem>
                  ) : (
                    ''
                  )
                }
              </ListGroup>
            </div>
          ) : ( // display nothing if there are no results
            ''
          )
        }
      </>
    )
  }
}

Result.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
}

export default Result
