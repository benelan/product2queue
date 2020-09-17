import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
} from 'reactstrap'
import classnames from 'classnames'
import VirtualScroll from './VirtualScroll'

/**
 * Displays product/buzzword inputs and a virtual scroll search suggestion box
 * @component
 * @author Ben Elan & Lingtao Xie
 * @parent Search
 */
class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
    }

    // changes the tab
    this.toggle = (tab) => {
      if (this.activeTab !== tab) this.setState({ activeTab: tab })
    }

    // clears the product input value
    this.clearProd = () => {
      this.inputProd.value = ''
    }

    // clears the buzzword input value
    this.clearBuzz = () => {
      this.inputBuzz.value = ''
    }

    // clears both product and buzzword inputs
    this.clear = () => {
      this.clearProd()
      this.clearBuzz()
    }
  }

  render() {
    // deconstruct props
    const {
      onBuzzwordsChange, onProductChange, onResult, filtered,
    } = this.props

    // deconstruct state
    const { activeTab } = this.state

    // list group item style
    const lgi = {
      height: '70px',
      color: 'black',
      fontSize: '16px',
    }

    // navlink style
    const navlinkStyle = {
      cursor: 'pointer',
    }

    // product/buzzword input style
    const inputStyle = {
      height: '40px',
      background: '#F7F9FA',
    }

    // Item for VirtualScroll component
    const Item = memo(({ index }) => (
      <ListGroupItem
        key={index}
        style={lgi}
        onClick={() => onResult(filtered[index])}
        tag="button"
        action
      >
        {filtered[index].ref}
      </ListGroupItem>
    ))
    Item.displayName = 'Item'

    return (
      <>
        <Nav
          tabs
          style={{ color: '#ADC5CC', border: 'transparent' }}
        >
          <NavItem>
            <NavLink
              style={navlinkStyle}
              className={classnames({
                active: activeTab === '1',
              })}
              onClick={() => { // when clicking on Product tab
                onProductChange('') // pass empty value to parent
                this.clearBuzz() // clear the buzzword input ref
                this.toggle('1') // set product to active tab
              }}
            >
              Product
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={navlinkStyle}
              className={classnames({
                active: activeTab === '2',
              })}
              onClick={() => { // when clicking on Buzzword tab
                onBuzzwordsChange('') // pass empty value to parent
                this.clearProd() // clear the product input ref
                this.toggle('2') // set buzzword to active tab
              }}
            >
              Buzzwords
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Card style={{ height: '82px' }} body>
              <Input
                innerRef={(input) => { this.inputProd = input; return input }}
                type="search"
                name="searchProduct"
                className="input"
                id="productInput"
                style={inputStyle}
                onChange={(e) => onProductChange(e.target.value.replace(/[^a-zA-Z ]/g, ' '))}
                placeholder="Search by Product"
              />
            </Card>
          </TabPane>
          <TabPane tabId="2">
            <Card style={{ height: '82px' }} body>
              <Input
                innerRef={(input) => { this.inputBuzz = input; return input }}
                type="search"
                name="searchBuzzwords"
                className="input"
                id="buzzwordsInput"
                style={inputStyle}
                onChange={(e) => onBuzzwordsChange(e.target.value.replace(/[^a-zA-Z ]/g, ' '))}
                placeholder="Search by Buzzwords"
              />
            </Card>
          </TabPane>
        </TabContent>
        <ListGroup>
          <VirtualScroll
            itemCount={filtered.length}
            height={300}
            childHeight={70}
            Item={Item}
          />
        </ListGroup>
      </>
    )
  }
}

Product.defaultProps = {
  index: undefined,
}

Product.propTypes = {
  /** event handler for product input */
  onProductChange: PropTypes.func.isRequired,
  /** event handler for technology input */
  onBuzzwordsChange: PropTypes.func.isRequired,
  /** event handler for clicking on a suggestion */
  onResult: PropTypes.func.isRequired,
  /** list of search suggestions */
  filtered: PropTypes.instanceOf(Array).isRequired,
  /** index for creating the virtual scroll */
  index: PropTypes.number,
}

export default Product
