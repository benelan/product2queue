import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink,
} from 'reactstrap'

const About = (props) => {
  const {
    buttonLabel,
    className,
  } = props

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div>
      <NavLink color="link" onClick={toggle} style={{ cursor: 'pointer' }}>{buttonLabel}</NavLink>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>About</ModalHeader>
        <ModalBody>
          The Product to Queue app is a browser-based tool created by Esri Support Services to help
          employees determine the appropriate team to handle a support case
          according to product names or buzzwords.
          <br />
          <ul>
            <li>
              To use the app, fill in the product name or buzzword in the search field,
              select a technology, then the results will be returned on the right of the web page.
            </li>
            <li>
              You can reset the search field and technology by clicking the
              <i> clear </i>
              button on the top-right corner.

            </li>
            <li>Please make sure to review the transfer resources before transferring a case.</li>
          </ul>
          If you have any questions about the products our queues, feel free to contact the
          <a href="mailto:supt-readinessleads@esri.com?subject=Product%20Supportability%20Question"> Readiness Leads</a>
          . Additionally, please report any issues or bugs to the
          <a href="mailto:belan@esri.com?cc=lxie@esri.com&subject=Product%20App%20Issue"> Developers</a>
          .
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Okay</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

About.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default About
