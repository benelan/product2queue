import React from 'react'
import PropTypes from 'prop-types'
import { Label, Card } from 'reactstrap'
import Select from 'react-select'

/**
 * Displays dropdown input for Technologies
 * @component
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
        backgroundColor: isFocused ? '#bfdcae' : 'white',
        ':active': {
          ...styles[':active'],
          backgroundColor: '#5cb85c',
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
    const items = [
      { value: 'Any', label: 'Any' },
      ...techList.map((tech) => ({ value: tech, label: tech })),
    ]

    return (
      <>
        <Label style={{ marginBottom: '13px' }} for="exampleSelect">
          Technology
        </Label>
        <Card style={{ height: '82px' }} body>
          <Select
            ref={(input) => { this.inputTech = input }}
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
  /** event handler for technology input */
  onTechnologyChange: PropTypes.func.isRequired,
  /** Array of technologies */
  techList: PropTypes.instanceOf(Array).isRequired,
}

export default Technology
