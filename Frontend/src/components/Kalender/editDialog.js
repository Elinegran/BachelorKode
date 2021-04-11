import React from 'react'; 
import { Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import SimpleDateTime  from 'react-simple-timestamp-to-date'; // Formatere tid og dato
// Import the library
import Datetime from 'react-datetime';
//import { useState } from "react"; // for å sende til backend
import axios from 'axios'; // for å sende/ motta til/ fra backend

import moment from 'moment';
import "../../../node_modules/react-datetime/css/react-datetime.css";
 
//eact-datetime/css/react-datetime.css

export default function Avtale(props){

 // alert('Dette mottas fra cale: ' + props.eventI);
  const avtaleID = props.eventI;
  const title = props.eventT;
  const beskrivelse = props.eventB;
  const sted = props.eventS;
  const start = props.eventStart.toString();
  const slutt = props.eventE.toString();

  
  const [nyTitle, setTitle] = useState(title);
  const [nyBeskrivelse, setBeskrivelse] = useState(beskrivelse);
  const [nySted, setSted] = useState(sted);
  const [nyStart, setStart] = useState(start);
  const [nySlutt, setSlutt] = useState(slutt);




 console.log(props.eventID)

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleClose  = () => {
    alert("Dette sendes: " + avtaleID);
      axios.post("http://localhost:3001/api/updateAvtale", {
      id: avtaleID,
      title: nyTitle, 
      beskrivelse: nyBeskrivelse, 
      sted: nySted, 
      start: nyStart, 
      slutt: nySlutt
    })
     
  };

  const handleShow  = () => (
    alert('Dette er Slett')
  );

  
  return (
    <>
    <Form>
  <Form.Group controlId="FormTitle">
    <Form.Label>Tittel</Form.Label>
    <Form.Control type="input" onChange = {(event) => {setTitle(event.target.value);}}  defaultValue = {title} />
  </Form.Group>

  <Form.Group controlId="FormBeskrivelse">
    <Form.Label>Beskrivelse</Form.Label>
    <Form.Control type="text" defaultValue={beskrivelse} onChange = {(event) => {setBeskrivelse(event.target.value);}} />
  </Form.Group>

  <Form.Group controlId="FormSted">
    <Form.Label>Sted</Form.Label>
    <Form.Control type="text" defaultValue = {sted} onChange = {(event) => {setSted(event.target.value);}} />
  </Form.Group>

  <Form.Group controlId="FormStart">
    <Form.Label>Start</Form.Label>
    <Form.Control type="text" defaultValue= {moment(start).format("YYYY-MM-DD HH:mm" )} onChange = {(event) => {setStart(event.target.value);}}/>
  </Form.Group>

  <Form.Group controlId="FormSlutt">
    <Form.Label>Slutt</Form.Label>
   
    <Form.Control type="datetime" defaultValue= {moment(slutt).format("YYYY-MM-DD HH:mm")} onChange = {(event) => {setSlutt(event.target.value);}}/>
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