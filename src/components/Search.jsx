/* eslint-disable react/destructuring-assignment */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'
import Product from './ui/Product'
import Technology from './ui/Technology'
import Result from './ui/Result'

/**
 * Loads CSV data, parses it to JSON, and creates a search index
 * @author Ben Elan
 * @parent App
 * @child Product, Technology, Result
 */
class Search extends React.Component {
  /**
    * Formulates a search string for use in Lunr
    * @param  {Object} query - the selected items to search for
    * @param  {Object} techList - the full list of technologies
    * @return {String} - the search string for Lunr
  */
  static createSearchString(query, techList) {
    // * wildcard means anything can be
    // before or behind the search value
    // ie *at* would include 'attack', 'fat', 'matter', etc
    // + means it must contain the value
    let q = '' // init query string
    let search = false
    // ---- FOR PRODUCT SEARCHES  ---- \\
    if (query.product !== '') {
      search = true
      // split search words
      const products = query.product.split(' ')
      // iterate through search words
      // adding them all to product field search
      products.forEach((prod) => {
        q += ` +product:*${prod}*`
      })
      // add tech field search value
      // if selected from dropdown
      if (query.technology !== 'Any') {
        q += ` +technology:${query.technology}`
      }
      // ---- FOR BUZZWORD SEARCHES  ---- \\
    } else if (query.buzzwords !== '') {
      search = true
      // split search words
      const buzzwords = query.buzzwords.split(' ')
      // add tech field search value
      // if selected from dropdown
      if (query.technology !== 'Any') {
        q += ` +technology:${query.technology}`
        // iterate through the buzzwords
        // adding them to the search value
        // for the tech specified in the dropdown
        buzzwords.forEach((buzz) => {
          q += ` +b_${query.technology.replace(
            /\s/g,
            '',
          )}:*${buzz}*`
        })
      } else {
        // if a tech isn't specified
        // iterate through the buzzwords
        // adding them to the search value
        // for all techs
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

    // if one of the conditionals above was met
    // do the search
    if (search) {
      return q
    }
    return null
  }

  static findResult(item, query, prod, tech) {
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
        // eslint-disable-next-line
        for (const [_, tech] of Object.entries(item.matchData.metadata)) {
          // iterate through the techs that each buzzword matches
          Object.keys(tech).forEach((o) => {
            // add the tech to the Set
            buzzTechs.add(o.substr(2)) // removing the "b_"
          })
        }

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
        // set the visible queues
        // removing trailing comma
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
      results: [],
    }
    this.handleProductChange = this.handleProductChange.bind(this)
    this.handleBuzzwordsChange = this.handleBuzzwordsChange.bind(this)
    this.handleTechnologyChange = this.handleTechnologyChange.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.clear = this.clear.bind(this)
  }

  handleProductChange(e) {
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] })
    // set the state to the product input value
    // eslint-disable-next-line react/no-access-state-in-setstate
    const q = this.state.query
    q.product = e.target.value.replace(/[^a-zA-Z ]/g, ' ')
    q.buzzwords = '' // clear buzzword search value
    this.setState({ query: q })
    const queryString = Search.createSearchString(this.state.query, this.props.techList)
    if (queryString) {
      const f = this.props.index.search(queryString)
      // set the search results for the dropdown list
      this.setState({ filtered: f })
      // if there is only one result display its info
      if (f.length === 1) {
        const result = Search.findResult(f[0], this.state.query, this.props.prod, this.props.tech)
        this.setState({ results: [result] })
      }
    }
  }

  handleBuzzwordsChange(e) {
    // clear the dropdown and results
    this.setState({ filtered: [], results: [] })
    // set the state to the product input value
    // eslint-disable-next-line react/no-access-state-in-setstate
    const q = this.state.query
    q.buzzwords = e.target.value.replace(/[^a-zA-Z ]/g, ' ')
    q.product = '' // clear product search value
    this.setState({ query: q })
    const queryString = Search.createSearchString(this.state.query, this.props.techList)
    if (queryString) {
      const f = this.props.index.search(queryString)
      // set the search results for the dropdown list
      this.setState({ filtered: f })
      // if there is only one result display its info
      if (f.length === 1) {
        const result = Search.findResult(f[0], this.state.query, this.props.prod, this.props.tech)
        this.setState({ results: [result] })
      }
    }
  }

  handleTechnologyChange(e) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const q = this.state.query
    q.technology = e.target.value
    this.setState({ query: q })

    // the section below is for changing the queue/tech in the results
    // when the technology dropdown is changed
    if (this.state.results.length > 0) {
      // set original results
      const originalResults = [...this.state.results][0]
      // set the list of original techs
      const originalTech = originalResults.technology.split(',').map((item) => item.trim())
      // set the state to the technology input value
      // if the original result includes the selected tech
      // we will narrow down the visible queues
      if (originalTech.includes(e.target.value)) {
        // set the temp string of queues
        // which is what will be visible
        let temp = ''
        // create the list of queues in the original results
        const originalQueues = originalResults.queue.split(',')
        // iterate through the queues
        originalQueues.forEach((query) => {
          // if the queue belongs to the selected tech
          if (
            this.props.tech[e.target.value.replace(/\s/g, '')].includes(
              query.trim(),
            )
          ) {
            // add it to the temp string
            temp += query.trim()
          }
        })
        // set the temp string to the visible results
        originalResults.visibleQueue = temp

        this.setState({ results: [originalResults] })
      } else if (e.target.value === 'Any') {
        originalResults.visibleQueue = originalResults.queue
      } else {
        // clear the dropdown and results
        this.setState({ filtered: [], results: [] })
        // start the search
      }
    } else {
      // clear the dropdown and results
      this.setState({ filtered: [], results: [] })
      // start the search
    }
    const queryString = Search.createSearchString(this.state.query, this.props.techList)
    if (queryString) {
      const f = this.props.index.search(queryString)
      // set the search results for the dropdown list
      this.setState({ filtered: f })
      // if there is only one result display its info
      if (f.length === 1) {
        const result = Search.findResult(f[0], this.state.query, this.props.prod, this.props.tech)
        this.setState({ results: [result] })
      }
    }
  }

  handleFilterClick(item) {
    const result = Search.findResult(item, this.state.query, this.props.prod, this.props.tech)
    this.setState({ results: [result] })
  }

  clear() {
    this.setState({
      filtered: [],
      query: {
        product: '',
        technology: 'Any',
        buzzwords: '',
      },
      results: [],
    })

    this.inputProd.clear()
    this.inputTech.clear()
  }

  render() {
    const {
      query, results, filtered,
    } = this.state

    const {
      techList, isMobile,
    } = this.props

    const mBot = {
      marginBottom: '10px',
    }

    const appStyle = {
      marginLeft: '5px',
      marginRight: '5px',
    }

    const extraM = {
      marginBottom: '10px',
      marginTop: '6px',
    }

    const buttonDisabled = !(query.product
      || query.buzzwords
      || query.technology !== 'Any'
      || results.length > 0)

    return (
      <>
        <Row style={{ marginTop: '10px', marginRight: '1px', marginBottom: '0px' }}>
          <Col md={{ size: 1, offset: 11 }}>
            <Button
              className="float-right"
              outline
              color="secondary"
              size="sm"
              disabled={buttonDisabled}
              onClick={this.clear}
            >
              clear
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-md-center" style={appStyle}>
          {isMobile ? ( // if the devie is mobile use tabs to divide the map/list
            <>
              <Col style={extraM} md={{ size: 4, offset: 0 }}>
                <Result results={results} />
              </Col>
              <Col style={extraM} md={{ size: 3, offset: 0 }}>
                <Technology
                  ref={(input) => { this.inputTech = input; return input }}
                  onTechnologyChange={this.handleTechnologyChange}
                  techList={techList}
                />
              </Col>
              <Col style={mBot} md={{ size: 5, offset: 0 }}>
                <Product
                  ref={(input) => { this.inputProd = input; return input }}
                  filtered={filtered}
                  onProductChange={this.handleProductChange}
                  onBuzzwordsChange={this.handleBuzzwordsChange}
                  onResult={this.handleFilterClick}
                />
              </Col>
            </>
          ) : (
            <>
              <Col style={mBot} md={{ size: 5, offset: 0 }}>
                <Product
                  ref={(input) => { this.inputProd = input; return input }}
                  filtered={filtered}
                  onProductChange={this.handleProductChange}
                  onBuzzwordsChange={this.handleBuzzwordsChange}
                  onResult={this.handleFilterClick}
                />
              </Col>

              <Col style={extraM} md={{ size: 3, offset: 0 }}>
                <Technology
                  ref={(input) => { this.inputTech = input; return input }}
                  onTechnologyChange={this.handleTechnologyChange}
                  techList={techList}
                />
              </Col>

              <Col style={extraM} md={{ size: 4, offset: 0 }}>
                <Result results={results} />
              </Col>
            </>
          )}
        </Row>
      </>
    )
  }
}

Search.defaultProps = {
  index: null,
}

Search.propTypes = {
  index: PropTypes.instanceOf(Object),
  prod: PropTypes.instanceOf(Array).isRequired,
  tech: PropTypes.instanceOf(Object).isRequired,
  techList: PropTypes.instanceOf(Array).isRequired,
  isMobile: PropTypes.bool.isRequired,
}

export default Search
