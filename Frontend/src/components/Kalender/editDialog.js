import React from 'react'; 
import { Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import {useState} from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend

import moment from 'moment';
import "../../../node_modules/react-datetime/css/react-datetime.css";

export default function Avtale(props){

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

  const handleUpt  = () => {
      axios.post("http://localhost:3001/api/updateAvtale", {
      id: avtaleID,
      title: nyTitle, 
      beskrivelse: nyBeskrivelse, 
      sted: nySted, 
      start: nyStart, 
      slutt: nySlutt
    })
     
  };

  const handleDelete  = () => {

    if(window.confirm(`Er du sikker på at du vil slette ${title}?`)) {
      
      //alert("dette er ID: " + clickInfo.event.id)
     
      const avtaleid = avtaleID;
      axios.post(`http://localhost:3001/api/slettAvtale`, {
        avtaleid: avtaleid
      })
        .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
            console.log("message")
          })
          window.location.reload()
    }
  };

  
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


    <Button variant="primary" type="submit" onClick={handleUpt} active>
        Lagre
      </Button> {' '}

      <Button variant="danger" onClick={handleDelete}active>
        Slett
      </Button>
  
</Form>
      

    </>
  );
}