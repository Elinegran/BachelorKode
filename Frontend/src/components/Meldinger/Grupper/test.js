import React from 'react';
import { useState } from "react"; // for å sende til backend
import axios from 'axios'; // for å sende/ motta til/ fra backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Card, Accordion, Button } from 'react-bootstrap'; // Bootstrap-greier

function Test() {
    const [idbruker, setBruker] = useState(0); 
    const [gruppeID, setGruppe] = useState(0); 

    // Sender det nye gruppenavnet til backend
    const addMedl = () => {
        axios.post("http://localhost:3001/api/grupperNyeGruppemedlemmer", { idbruker: idbruker, gruppeID: gruppeID, })   
      };

    return(
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0"> Gruppe 1 </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Medlemmer gruppe 1</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1"> Gruppe 2 </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>Medlemmer gruppe 2</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>

    
    ) // slutt på return
} // slutt å funksjon Test

export default Test; 