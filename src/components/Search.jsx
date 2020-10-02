import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'
import Product from './ui/Product'
import Technology from './ui/Technology'
import Result from './ui/Result'
import ErrorBoundary from './ErrorBoundary'

/**
 * Handles input change events from child UI components,
 *  creates and excutes searches, finds resulting data
 * @author Ben Elan
 * @component
 * @parent App
 * @child Product, Technology, Result
 */
class Search extends React.Component {
  /**
    * Formulates a search string for use in Lunr
    * @param {Object} input - contains the properties below
    * @param  {Object} input.query - the selected items to search for
    * @param  {Array} input.techList - the full list of technologies
    * @return {String} the search string for Lunr
  */
  static createSearchString({ query, techList }) {
    // * wildcard means anything can be  before or behind the search value
    // ie *at* would include 'attack', 'fat', 'matter', etc
    // + means it must contain the value
    let q = '' // init query string
    let search = false
    // ---- FOR PRODUCT SEARCHES  ---- \\
    if (query.product && query.product !== '') {
      search = true
      // split search words
      const products = query.product.split(' ')
      // iterate through search words, adding them all to product field search
      products.forEach((prod) => {
        q += ` +product:*${prod}*`
      })
      // add tech field search value if selected from dropdown
      if (query.technology !== 'Any') {
        q += ` +technology:${query.technology}`
      }
      // ---- FOR BUZZWORD SEARCHES  ---- \\
    } else if (query.buzzwords && query.buzzwords !== '') {
      search = true
      // split search words
      const buzzwords = query.buzzwords.split(' ')
      // add tech field search value if selected from dropdown
      if (query.technology !== 'Any') {
        q += ` +technology:${query.technology}`
        // iterate through the buzzwords adding them to the
        // search value for the tech specified in the dropdown
        buzzwords.forEach((buzz) => {
          q += ` +b_${query.technology.replace(
            /\s/g,
            '',
          )}:*${buzz}*`
        })
      } else {
        // if a tech isn't specified, iterate through the buzzwords
        // adding them to the search value for all techs
        techList.forEach((t) => {
          buzzwords.forEach((buzz) => {
            q += ` b_${t.replace(/\s/g, '')}:*${buzz}*`
          })
        })
      }
    } else if (
      query.buzzwords === ''
      && query.buzzwords === ''
      && query.technology !== 'Any'
    ) {
      search = true
      q += `+technology:${query.technology}`
    }

    // if one of the conditionals above was met, do the search
    if (search) {
      return q
    }
    return null
  }

  /**
    * Finds product info after a suggestion is clicked on
    * @param {Object} input - contains the properties below
    * @param  {Object} input.item - the selected lunr search index item
    * @param  {Object} input.query - the selected items to search for
    * @param  {Array} input.prod - the products key/pair with all info
    * @param  {Object} input.tech - the tech key/pair with the queues
    * @return {Object} the product info to display in results
  */
  static findResult({
    item, query, prod, tech,
  }) {
    // match the index ref to the full data struct to get all of the info
    const matches = prod.find((res) => item.ref === res.product)
    // create an array of queues
    const queueArray = matches.queue.split(',').map((entry) => entry.trim())
    // create a seperate list of queues that will be visible in the results
    matches.visibleQueue = matches.queue

    // if there is more than one queue
    if (queueArray.length > 1) {
      let temp = ''

      // if a technology is selected
      if (query.technology !== 'Any') {
        // iterate through the queues
        queueArray.forEach((q) => {
          // check if the queue is in the selected technology
          if (
            tech[
              query.technology.replace(/\s/g, '')
            ].includes(q.trim())
          ) {
            // if it is, add it to the visible list
            temp += q.trim()
          }
        })
        matches.visibleQueue = temp
      }

      // if we are doing a buzzword search and Technology is Any
      if (
        !!query.buzzwords
        && query.technology === 'Any'
      ) {
        const buzzTechs = new Set() // init Set
        // iterate through all of the buzzwords
        Object.values(item.matchData.metadata).forEach((buzz) => {
          // iterate through the techs that each buzzword matches
          Object.keys(buzz).forEach((buzzTech) => {
            // add the tech to the Set
            buzzTechs.add(buzzTech.substr(2)) // removing the "b_"
          })
        })

        // iterate through the queues
        queueArray.forEach((q) => {
          // iterate through the technologies that the buzzword matches
          buzzTechs.forEach((t) => {
            // if the queue belongs to the tech
            if (tech[t].includes(q.trim())) {
              // add it to the list
              temp += `${q.trim()}, `
            }
          })
        })
        // set the visible queues, removing trailing comma
        matches.visibleQueue = temp.replace(/(^[,\s]+)|([,\s]+$)/g, '')
      }
    }

    // set the state to the result info
    return matches
  }

  constructor(props) {
    super(props)
    this.state = {
      filtered: [],
      query: {
        product: '',
        technology: 'Any',
        buzzwords: '',
      },
      results: {},
    }
    this.handleProductChange = this.handleProductChange.bind(this)
    this.handleBuzzwordsChange = this.handleBuzzwordsChange.bind(this)
    this.handleTechnologyChange = this.handleTechnologyChange.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.clear = this.clear.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  /** Performs the lunr search using state/props and static methods */
  doSearch() {
    const {
      prod, tech, techList, index,
    } = this.props
    const { query } = this.state
    // create the lunr search string
    const queryString = Search.createSearchString({ query, techList })
    // if a string is returned
    if (queryString) {
      // do the search
      const filtered = index.search(queryString)
      // set the search results for the dropdown list
      this.setState({ filtered })
      // if there is only one result display its info
      if (filtered.length === 1) {
        const item = filtered[0]
        const results = Search.findResult({
          item, query, prod, tech,
        })
        this.setState({ results })
      }
    }
  }

  /**
    * Event handler for the product input.
    * Changes state and then starts the search.
    * @param  {String} newProd - the new product input
  */
  async handleProductChange(newProd) {
    // clear the dropdown and results and change query
    await this.setState((prevState) => ({
      query: { // object that we want to update
        ...prevState.query, // keep all other key-value pairs
        product: newProd,
        buzzwords: '',
      },
      filtered: [],
      results: {},
    }))
    this.doSearch()
  }

  /**
    * Event handler for the buzzword input.
    * Changes state and then starts the search.
    * @param  {String} newBuzz - the new buzzword input
  */
  async handleBuzzwordsChange(newBuzz) {
    // clear the dropdown and results and change query
    await this.setState((prevState) => ({
      query: { // object that we want to update
        ...prevState.query, // keep all other key-value pairs
        buzzwords: newBuzz,
        product: '',
      },
      filtered: [],
      results: {},
    }))
    this.doSearch()
  }

  /**
    * Event handler for the technology input.
    * Changes state, manipulates results, and then starts the search.
    * @param  {String} newTech - the new technology selection
  */
  async handleTechnologyChange(newTech) {
    const { results } = this.state
    const { tech } = this.props

    await this.setState((prevState) => ({
      query: { // object that we want to update
        ...prevState.query, // keep all other key-value pairs
        technology: newTech, // update the value of specific key
      },
    }))

    // the section below is for changing the queue/tech in the results
    // when the technology dropdown is changed
    if (results.length > 0) {
      // set original results
      const originalResults = [...results][0]
      // set the list of original techs
      const originalTech = originalResults.technology.split(',').map((item) => item.trim())
      // set the state to the technology input value if the original result
      // includes the selected tech we will narrow down the visible queues
      if (originalTech.includes(newTech)) {
        // set the temp string of queues which is what will be visible
        let temp = ''
        // create the list of queues in the original results
        const originalQueues = originalResults.queue.split(',')
        // iterate through the queues
        originalQueues.forEach((query) => {
          // if the queue belongs to the selected tech
          if (
            tech[newTech.replace(/\s/g, '')].includes(
              query.trim(),
            )
          ) {
            // add it to the temp string
            temp += query.trim()
          }
        })
        // set the temp string to the visible results
        originalResults.visibleQueue = temp

        this.setState({ results: originalResults })
      } else if (newTech === 'Any') {
        originalResults.visibleQueue = originalResults.queue
      } else {
        // clear the dropdown and results
        this.setState({ filtered: [], results: {} })
      }
    } else {
      // clear the dropdown and results
      this.setState({ filtered: [], results: {} })
    }
    this.doSearch()
  }

  /**
    * Event handler for clicking on a search suggestion.
    * Finds results for the clicked item and sets them to state.
    * @param  {Object} item - the selected product
  */
  handleFilterClick(item) {
    const { prod, tech } = this.props
    const { query } = this.state
    const results = Search.findResult({
      item, query, prod, tech,
    })
    this.setState({ results })
  }

  /** resets the state and clears the input UI */
  clear() {
    this.setState({
      filtered: [],
      query: {
        product: '',
        technology: 'Any',
        buzzwords: '',
      },
      results: {},
    })

    this.inputProd.clear()
    this.inputTech.clear()
  }

  resetState() {
    this.setState({
      filtered: [],
      query: {
        product: '',
        technology: 'Any',
        buzzwords: '',
      },
      results: {},
    })
  }

  render() {
    // deconstruct state
    const {
      query, results, filtered,
    } = this.state
    // deconstruct props
    const {
      techList, isMobile,
    } = this.props

    // if inputs are empty disable clear button
    const buttonDisabled = !(query.product
      || query.buzzwords
      || query.technology !== 'Any'
      || results.length > 0)

    return (
      <ErrorBoundary resetState={this.resetState}>
        <Row className="mt-2 mr-1">
          <Col md={{ size: 1, offset: 11 }}>
            <Button
              className="float-right"
              outline
              color="success"
              size="sm"
              disabled={buttonDisabled}
              onClick={this.clear}
            >
              clear
            </Button>
          </Col>
        </Row>

        {isMobile ? ( // if the device is mobile put the product dropdown on the bottom
          <Row className="justify-content-md-center ml-2 mr-2">
            <Col className="mb-2 mt-1" md={{ size: 4, offset: 0 }}>
              <Result results={results} />
            </Col>
            <Col className="mb-2 mt-1" md={{ size: 3, offset: 0 }}>
              <Technology
                ref={(input) => { this.inputTech = input; return input }}
                onTechnologyChange={this.handleTechnologyChange}
                techList={techList}
              />
            </Col>
            <Col className="mb-1" md={{ size: 5, offset: 0 }}>
              <Product
                ref={(input) => { this.inputProd = input; return input }}
                filtered={filtered}
                onProductChange={this.handleProductChange}
                onBuzzwordsChange={this.handleBuzzwordsChange}
                onResult={this.handleFilterClick}
              />
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-md-center ml-2 mr-2">
            <Col className="mb-1" md={{ size: 5, offset: 0 }}>
              <Product
                ref={(input) => { this.inputProd = input; return input }}
                filtered={filtered}
                onProductChange={this.handleProductChange}
                onBuzzwordsChange={this.handleBuzzwordsChange}
                onResult={this.handleFilterClick}
              />
            </Col>

            <Col className="mb-2 mt-1" md={{ size: 3, offset: 0 }}>
              <Technology
                ref={(input) => { this.inputTech = input; return input }}
                onTechnologyChange={this.handleTechnologyChange}
                techList={techList}
              />
            </Col>

            <Col className="mb-2 mt-1" md={{ size: 4, offset: 0 }}>
              <Result results={results} />
            </Col>
          </Row>
        )}
      </ErrorBoundary>
    )
  }
}

Search.defaultProps = {
  index: null,
}

Search.propTypes = {
  /** the lunr search index */
  index: PropTypes.instanceOf(Object),
  /** the product key/value pairs to search */
  prod: PropTypes.instanceOf(Array).isRequired,
  /** technologies and their queues */
  tech: PropTypes.instanceOf(Object).isRequired,
  /** list of technologies */
  techList: PropTypes.instanceOf(Array).isRequired,
  /** device type for rendering */
  isMobile: PropTypes.bool.isRequired,
}

export default Search
