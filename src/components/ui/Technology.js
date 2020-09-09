import React from 'react'
import PropTypes from 'prop-types'
import { Label, Card } from 'reactstrap'
import Select from 'react-select'

class Technology extends React.Component {
  clear() {
    this.inputTech.state.value = { target: { value: 'Any' }, label: 'Any' }
  }

  render() {
    const colourStyles = {
      control: (styles) => ({
        ...styles,
        backgroundColor: '#F7F9FA',
        cursor: 'pointer',
        boxShadow: 'none',
        minHeight: '40px',
        height: '40px',
      }),
      menu: (base) => ({
        ...base,
        marginTop: '21.5px',
        left: '-20px',
        width: 'calc(100% + 40px)',
        boxShadow: '0.5px 0.5px 0.5px 0.5px lightgray',
        minHeight: 'fit-content',
        minWidth: 'fit-content',
      }),
      // eslint-disable-next-line
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isFocused ? 'whitesmoke' : 'white',
          ':active': {
            ...styles[':active'],
            backgroundColor: 'lightgrey',
          },
          color: 'black',
          cursor: 'pointer',
          minHeight: 'fit-content',
          minWidth: 'fit-content',
          paddingTop: '6px',
          paddingBottom: '6px',
          fontSize: '16px',
        }
      },
    }


    const items = this.props.techList.map((tech) => {
      return { target: { value: tech }, label: tech }
    })

    items.unshift({ target: { value: 'Any' }, label: 'Any' })

    return (
      <React.Fragment>
        <Label style={{ marginBottom: '11px' }} for="exampleSelect">
          Technology
        </Label>
        <Card style={{ height: '82px' }} body>
          <Select
            ref={input => this.inputTech = input}
            defaultValue={items[0]}
            label="Select Technology"
            options={items}
            styles={colourStyles}
            onChange={(selectedOption) =>
              this.props.onTechnologyChange(selectedOption)
            }
          />
        </Card>
      </React.Fragment>
    )
  }
}

Technology.propTypes = {
  onTechnologyChange: PropTypes.func,
  techList: PropTypes.array,
  children: PropTypes.any
}

export default Technology
