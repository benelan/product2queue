import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';

const About = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (
    <div>
      <NavLink color="link" onClick={toggle}>{buttonLabel}</NavLink>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>About</ModalHeader>
        <ModalBody>
        This app was created for Esri Support Services to help employees determine which team supports each product. 
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Okay</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default About;