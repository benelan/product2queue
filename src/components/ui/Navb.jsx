import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import About from './About'

/**
 * Top information bar
 * @author Ben Elan
 * @parent App
 * @child About
 */
const Navb = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const linkStyle = {
    color: 'black',
    fontSize: '16px',
    padding: 0,
    margin: 0,
  }

  return (
    <Navbar dark color="dark" expand="md">
      <NavbarBrand href="/">Product to Queue</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <About buttonLabel="About" />
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Transfer Resources
            </DropdownToggle>
            <DropdownMenu
              style={{
                top: 35, left: +8, padding: 0, margin: 0,
              }}
            >
              <DropdownItem>
                <NavLink
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008f0KAAQ/view"
                >
                  Data Management
                </NavLink>
              </DropdownItem>
              {/* <DropdownItem divider /> */}
              <DropdownItem>
                <NavLink
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008kIXAAY/view"
                >
                  SDK
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Navb
