import React from 'react'; 
import { Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import SimpleDateTime  from 'react-simple-timestamp-to-date'; // Formatere tid og dato
// Import the library
import Datetime from 'react-datetime';

import moment from 'moment';
import "../../../node_modules/react-datetime/css/react-datetime.css";
 
//eact-datetime/css/react-datetime.css

export default function Avtale(props){
  const title = props.eventT;
  const beskrivelse = props.eventB;
  const sted = props.eventS;
  const start = props.eventStart;
  const slutt = props.eventE;
 const [show, setShow] = useState(false);

 console.log(props.eventID)

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleClose  = () => (
    alert('Dette er Lagre')

    );
  const handleShow  = () => (
    alert('Dette er Slett')
  );
  
  return (
    <>
    <Form>
  <Form.Group controlId="FormTitle">
    <Form.Label>Tittel</Form.Label>
    <Form.Control type="text" value = {title} />
  </Form.Group>

  <Form.Group controlId="FormBeskrivelse">
    <Form.Label>Beskrivelse</Form.Label>
    <Form.Control type="text" value={beskrivelse} />
  </Form.Group>

  <Form.Group controlId="FormSted">
    <Form.Label>Sted</Form.Label>
    <Form.Control type="text" value={sted} />
  </Form.Group>

  <Form.Group controlId="FormStart">
    <Form.Label>Start</Form.Label>
    <Form.Control type="datetime" value={start} />
  </Form.Group>

  <Form.Group controlId="FormSlutt">
    <Form.Label>Slutt</Form.Label>
   
    <Form.Control type="datetime" value= {slutt} />
  </Form.Group>

 
    {/* <Datetime  initialValue={start} />; */}

    {/* {moment().format(start)} */}
  <Button variant="primary" onClick={handleClose}>
        Lagre
      </Button>

      <Button variant="primary" onClick={handleShow}>
        Slett
      </Button>
  
</Form>
     {title }
      

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}