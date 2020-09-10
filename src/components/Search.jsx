/* eslint-disable react/destructuring-assignment */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'
import Product from './ui/Product'
import Technology from './ui/Technology'
import Result from './ui/Result'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleProductChange = this.handleProductChange.bind(this)
    this.handleBuzzwordsChange = this.handleBuzzwordsChange.bind(this)
    this.handleTechnologyChange = this.handleTechnologyChange.bind(this)

    this.startSearch = this.startSearch.bind(this)
    this.findResult = this.findResult.bind(this)
    this.clear = this.clear.bind(this)

    this.state = {
      filtered: [],
      query: {
        product: '',
        technology: 'Any',
        buzzwords: '',
      },
      results: [],
      mobile: false,
    }
  }

  componentDidMount() {
    // device detection
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent,
      )
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
        navigator.userAgent.substr(0, 4),
      )
    ) {
      this.setState({ mobile: true })
    }
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
    this.startSearch()
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
    this.startSearch()
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
      const or = this.state.results[0]
      // set the list of original techs
      const ort = or.technology.split(',').map((item) => item.trim())
      // set the state to the technology input value
      // if the original result includes the selected tech
      // we will narrow down the visible queues
      if (ort.includes(e.target.value)) {
        // set the temp string of queues
        // which is what will be visible
        let temp = ''
        // create the list of queues in the original results
        const orq = or.queue.split(',')
        // iterate through the queues
        orq.forEach((query) => {
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
        or.visibleQueue = temp

        this.setState({ results: [or] })
      } else if (e.target.value === 'Any') {
        or.visibleQueue = or.queue
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
    this.startSearch()
  }

  startSearch() {
    // * wildcard means anything can be
    // before or behind the search value
    // ie *at* would include 'attack', 'fat', 'matter', etc
    // + means it must contain the value
    let q = '' // init query string
    let search = false
    // ---- FOR PRODUCT SEARCHES  ---- \\
    if (this.state.query.product !== '') {
      search = true
      // split search words
      const products = this.state.query.product.split(' ')
      // iterate through search words
      // adding them all to product field search
      products.forEach((prod) => {
        q += ` +product:*${prod}*`
      })
      // add tech field search value
      // if selected from dropdown
      if (this.state.query.technology !== 'Any') {
        q += ` +technology:${this.state.query.technology}`
      }
      // ---- FOR BUZZWORD SEARCHES  ---- \\
    } else if (this.state.query.buzzwords !== '') {
      search = true
      // split search words
      const buzzwords = this.state.query.buzzwords.split(' ')
      // add tech field search value
      // if selected from dropdown
      if (this.state.query.technology !== 'Any') {
        q += ` +technology:${this.state.query.technology}`
        // iterate through the buzzwords
        // adding them to the search value
        // for the tech specified in the dropdown
        buzzwords.forEach((buzz) => {
          q += ` +b_${this.state.query.technology.replace(
            /\s/g,
            '',
          )}:*${buzz}*`
        })
      } else {
        // if a tech isn't specified
        // iterate through the buzzwords
        // adding them to the search value
        // for all techs
        this.props.techList.forEach((t) => {
          buzzwords.forEach((buzz) => {
            q += ` b_${t.replace(/\s/g, '')}:*${buzz}*`
          })
        })
      }
    } else if (
      this.state.query.buzzwords === ''
      && this.state.query.buzzwords === ''
      && this.state.query.technology !== 'Any'
    ) {
      search = true
      q += `+technology:${this.state.query.technology}`
    }

    // if one of the conditionals above was met
    // do the search
    if (search) {
      // set lunr search to query
      const f = this.props.index.search(q)
      // set the search results for the dropdown list
      this.setState({ filtered: f })
      // if there is only one result display its info
      if (f.length === 1) {
        this.findResult(f[0])
      }
    }
  }

  findResult(item) {
    // match the index ref to the full data struct to get all of the info
    const qs = this.props.prod.find((res) => item.ref === res.product)
    // create an array of queues
    const qa = qs.queue.split(',').map((entry) => entry.trim())
    // create a seperate list of queues that will be visible in the results
    qs.visibleQueue = qs.queue

    // if there is more than one queue
    if (qa.length > 1) {
      let temp = ''

      // if a technology is selected
      if (this.state.query.technology !== 'Any') {
        // iterate through the queues
        qa.forEach((q) => {
          // check if the queue is in the selected technology
          if (
            this.props.tech[
              this.state.query.technology.replace(/\s/g, '')
            ].includes(q.trim())
          ) {
            // if it is, add it to the visible list
            temp += q.trim()
          }
        })
        qs.visibleQueue = temp
      }

      // if we are doing a buzzword search and Technology is Any
      if (
        !!this.state.query.buzzwords
        && this.state.query.technology === 'Any'
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
        qa.forEach((q) => {
          // iterate through the technologies that the buzzword matches
          buzzTechs.forEach((t) => {
            // if the queue belongs to the tech
            if (this.props.tech[t].includes(q.trim())) {
              // add it to the list
              temp += `${q.trim()}, `
            }
          })
        })
        // set the visible queues
        // removing trailing comma
        qs.visibleQueue = temp.replace(/(^[,\s]+)|([,\s]+$)/g, '')
      }
    }

    // set the state to the result info
    this.setState({ results: [qs] })
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
      query, results, mobile, filtered,
    } = this.state

    const { techList } = this.props

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
      <div>
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
          {mobile ? ( // if the devie is mobile use tabs to divide the map/list
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
                  onResult={this.findResult}
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
                  onResult={this.findResult}
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
      </div>
    )
  }
}

Search.propTypes = {
  index: PropTypes.instanceOf(Object).isRequired,
  prod: PropTypes.instanceOf(Array).isRequired,
  tech: PropTypes.instanceOf(Object).isRequired,
  techList: PropTypes.instanceOf(Array).isRequired,
}

export default Search
