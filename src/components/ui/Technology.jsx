import React from 'react'
import PropTypes from 'prop-types'
import { Label, Card } from 'reactstrap'
import Select from 'react-select'

const Technology = class extends React.Component {
  clear() {
    this.inputTech.state.value = { target: { value: 'Any' }, label: 'Any' }
  }

  render() {
    const { techList, onTechnologyChange } = this.props
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
      option: (styles, { isFocused }) => ({
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

    const items = techList.map((tech) => ({ target: { value: tech }, label: tech }))

    items.unshift({ target: { value: 'Any' }, label: 'Any' })

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
            styles={colourStyles}
            onChange={(selectedOption) => onTechnologyChange(selectedOption)}
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
