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

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
    }

    this.toggle = (tab) => {
      if (this.activeTab !== tab) this.setState({ activeTab: tab })
    }

    this.clearProd = () => {
      this.inputProd.value = ''
    }

    this.clearBuzz = () => {
      this.inputBuzz.value = ''
    }

    this.clear = () => {
      this.clearProd()
      this.clearBuzz()
    }
  }

  render() {
    const {
      onBuzzwordsChange, onProductChange, onResult, filtered,
    } = this.props
    const { activeTab } = this.state
    // list group item style
    const lgi = {
      height: '70px',
      color: 'black',
      fontSize: '16px',
    }

    const navlinkStyle = {
      cursor: 'pointer',
    }

    const inputStyle = {
      height: '40px',
      background: '#F7F9FA',
    }

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
              onClick={() => {
                const val = {
                  target: {
                    value: '',
                  },
                }
                onProductChange(val)
                this.clearProd()
                this.toggle('1')
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
              onClick={() => {
                const val = {
                  target: {
                    value: '',
                  },
                }
                onBuzzwordsChange(val)
                this.clearBuzz()
                this.toggle('2')
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
                onChange={onProductChange}
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
                onChange={onBuzzwordsChange}
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
  onProductChange: PropTypes.func.isRequired,
  onBuzzwordsChange: PropTypes.func.isRequired,
  onResult: PropTypes.func.isRequired,
  filtered: PropTypes.instanceOf(Array).isRequired,
  index: PropTypes.number,
}

export default Product
