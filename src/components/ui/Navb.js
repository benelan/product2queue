import React, { useState } from "react";
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
  DropdownItem
} from "reactstrap";
import About from "./About"

const Navb = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light style={{backgroundColor: "white"}} expand="md">
        <NavbarBrand href="/">Product to Queue</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className="float-right" navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <About buttonLabel="About"/>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Transfer Resources
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008f0KAAQ/view">
                    Data Management
                  </NavLink>
                </DropdownItem>
                {/* <DropdownItem divider /> */}
                <DropdownItem>
                  <NavLink href="https://esri.lightning.force.com/lightning/r/Knowledge__kav/ka15x0000008kIXAAY/view">
                    SDK
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navb;
