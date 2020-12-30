import React from 'react'
import PropTypes from 'prop-types'
import { Label, ListGroup, ListGroupItem } from 'reactstrap'

/**
 * Displays selected product information
 * @component
 * @author Ben Elan & Lingtao Xie
 * @parent Search
 */
const Result = ({ results }) => {
  // hyperlink color
  const linkStyle = {
    color: '#5cb85c',
  }

  // URLs for transfer resources
  const geoData = 'https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008f0KAAQ/view'
  const sdk = 'https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008kIXAAY/view'

  return (
    <>
      { // if there are results, display them
        results.product ? (
          <>
            <Label style={{ marginBottom: '13px' }} for="res">Results</Label>
            <ListGroup id="res">
              <ListGroupItem>
                <b>Product: </b>
                {results.product}
              </ListGroupItem>
              <ListGroupItem>
                <b>Queue: </b>
                {results.visibleQueue}
              </ListGroupItem>
              <ListGroupItem>
                <b>Support Method: </b>
                {results.supportMethod}
              </ListGroupItem>

              { // display reference url if there is one
                results.url ? (
                  <ListGroupItem>
                    <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={results.url}>
                      <b>Reference</b>
                    </a>
                  </ListGroupItem>
                ) : ('')
              }
              { // display email if there is one
                results.email ? (
                  <ListGroupItem>
                    <b>Contact: </b>
                    <a style={linkStyle} href={`mailto:${results.email}`}>
                      {results.email}
                    </a>
                  </ListGroupItem>
                ) : ('')
              }
              { // display data transfer resource if the data queue in results
                results.visibleQueue.includes('Data') ? (
                  <ListGroupItem>
                    Please review
                    {' '}
                    <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={geoData}>this documentation</a>
                    {' '}
                    before transferring to Data Management.
                  </ListGroupItem>
                ) : ('')
              }
              { // display sdk transfer resource if the sdk queue in results
                results.visibleQueue.includes('SDK') ? (
                  <ListGroupItem>
                    Please review
                    {' '}
                    <a target="_blank" rel="noopener noreferrer" style={linkStyle} href={sdk}>this documentation</a>
                    {' '}
                    before transferring to Developer Products.
                  </ListGroupItem>
                ) : ('')
              }
            </ListGroup>
          </>
        ) : ('') // display nothing if there are no results
      }
    </>
  )
}

Result.propTypes = {
  /** Result object to display */
  results: PropTypes.instanceOf(Object).isRequired,
}

export default Result
