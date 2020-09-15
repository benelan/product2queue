import React from 'react'
import PropTypes from 'prop-types'
import { Label, Card } from 'reactstrap'
import Select from 'react-select'

/**
 * Displays dropdown input for Technologies
 * @author Ben Elan & Lingtao Xie
 * @parent Search
 */
const Technology = class extends React.Component {
  // resets the dropdown
  clear() {
    this.inputTech.state.value = { value: 'Any', label: 'Any' }
  }

  render() {
    // deconstruct props
    const { techList, onTechnologyChange } = this.props
    // the style for the dropdown
    const dropdownStyles = {
      control: (styles) => ({ // unopened dropdown style
        ...styles,
        backgroundColor: '#F7F9FA',
        cursor: 'pointer',
        boxShadow: 'none',
        minHeight: '40px',
        height: '40px',
      }),
      menu: (base) => ({ // dropdown menu box
        ...base,
        marginTop: '21.5px',
        left: '-20px',
        width: 'calc(100% + 40px)',
        boxShadow: '0.5px 0.5px 0.5px 0.5px lightgray',
        minHeight: 'fit-content',
        minWidth: 'fit-content',
      }),
      option: (styles, { isFocused }) => ({ // individual option elements
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
      }),
    }

    // turn the tech list into react-select compatible object
    const items = techList.map((tech) => ({ value: tech, label: tech }))

    // add 'Any' to the beginning of the list
    items.unshift({ value: 'Any', label: 'Any' })

    return (
      <>
        <Label style={{ marginBottom: '11px' }} for="exampleSelect">
          Technology
        </Label>
        <Card style={{ height: '82px' }} body>
          <Select
            ref={(input) => { this.inputTech = input; return input }}
            defaultValue={items[0]}
            label="Select Technology"
            options={items}
            styles={dropdownStyles}
            onChange={(e) => onTechnologyChange(e.value)}
          />
        </Card>
      </>
    )
  }
}

Technology.propTypes = {
  onTechnologyChange: PropTypes.func.isRequired,
  techList: PropTypes.instanceOf(Array).isRequired,
}

export default Technology
